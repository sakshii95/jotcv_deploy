from django.shortcuts import render
from rest_framework import generics
from .models import *
from . serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .tasks import *
from rest_framework.permissions import IsAuthenticated
from api.tasks import send_application_email,send_test_email
import os
# Create your views here.

from rest_framework.pagination import PageNumberPagination




class EmployerListAPIView(generics.ListAPIView):
    serializer_class = EmployerSerializer

    def get_queryset(self):
        queryset = Company.objects.all().order_by('id')  
        name_param = self.request.query_params.get('name', None)

        if name_param:
            queryset = queryset.filter(name__icontains=name_param)

        return queryset

class EmployerDetailAPIView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Company.objects.all().order_by('id') 
    serializer_class = EmployerSerializer

class JobUpdateAPIView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Job.objects.all().order_by('id') 
    serializer_class = JobUpdateSerializer


class CustomJobPagination(PageNumberPagination):
    page_size = 80
    max_page_size = 80
    
class JobAPIView(APIView):
    def get(self, request, *args, **kwargs):
        jobs = Job.objects.all().order_by("-id")
        query = request.GET.get("q", "")

        if query:
            search_terms = query.split()

            if search_terms[0].isdigit():
                job_id = int(search_terms[0])
                try:
                    job = jobs.get(id=job_id)
                    serializer = JobSerializer(job)
                    return Response(serializer.data)
                except Job.DoesNotExist:
                    return Response({"detail": "Job not found"}, status=status.HTTP_404_NOT_FOUND)

            else:
                q_objects = Q()

                for term in search_terms:
                    q_objects &= (
                        Q(title__icontains=term) |
                        Q(locations__icontains=term) |
                        Q(drive__icontains=term) |
                        Q(interview_status__icontains=term) |
                        Q(keywords__contains=[term])
                    )

                jobs = jobs.filter(q_objects).order_by("-id").distinct()

        location_filter = request.GET.get("location", "")
        company_name_filter = request.GET.get("company_name", "")
        job_category_filter = request.GET.get("job_title", "")
        skill_filter = request.GET.get("skill","")
        q1_object = Q()

        if skill_filter:
            skills = skill_filter.split()

            for skill in skills:
                q1_object |= Q(skills__name__icontains=skill)
                jobs = Job.objects.filter(q1_object)


        if location_filter:
            jobs = jobs.filter(locations__icontains=location_filter)

        if company_name_filter:
            jobs = jobs.filter(company__name__icontains=company_name_filter)

        if job_category_filter:
            jobs = jobs.filter(title__icontains=job_category_filter)


        # paginator = CustomJobPagination()
        # result_page = paginator.paginate_queryset(jobs, request)

        # serializer = JobSerializer(result_page, many=True)
        # return paginator.get_paginated_response(serializer.data)


        paginator = CustomJobPagination()
        result_page = paginator.paginate_queryset(jobs, request)

        serializer = JobSerializer(result_page, many=True)

        response_data = {
            'total_pages': paginator.page.paginator.num_pages,
            'jobs': serializer.data
        }

        return paginator.get_paginated_response(response_data)


class SubscribeToJobNewsletter(APIView):
    def post(self, request, format=None):
        try:
            email = request.data.get("email")

            if not email:
                return Response({"message": "Email is required for subscription", "status": status.HTTP_400_BAD_REQUEST}, status.HTTP_400_BAD_REQUEST)

            if JobSubscriber.objects.filter(email=email).exists():
                return Response({"message": "Email is already subscribed", "status": status.HTTP_400_BAD_REQUEST}, status.HTTP_400_BAD_REQUEST)

            subscriber_data = {'email': email}
            serializer = JobSubscriberSerializer(data=subscriber_data)

            if serializer.is_valid():
                serializer.save()
                send_job_newsletter_task.delay(email)

                return Response({"message": "Subscribed successfully", "status": status.HTTP_201_CREATED}, status.HTTP_201_CREATED)
            else:
                return Response({"message": "Invalid data", "status": status.HTTP_400_BAD_REQUEST}, status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"message": str(e), "status": status.HTTP_500_INTERNAL_SERVER_ERROR}, status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class ApplyJobAPIView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        job_applications = JobApplication.objects.filter(user=user).order_by('-created_at')
        serializer = EmailSerializer(job_applications, many=True)
        return Response(serializer.data)
    def post(self, request, *args, **kwargs):
        try:
            serializer = EmailSerializer(data=request.data)

            if serializer.is_valid():
                user = request.user
                user_email = user.email
                subject = serializer.validated_data['subject']
                body = serializer.validated_data['body']
                email_title = serializer.validated_data['email_title']
                job_id = serializer.validated_data['job_id']

                required_fields = [ "email_title", "body","subject","job_id"]
                if not all(request.data.get(field) for field in required_fields):
                    return Response({"message": "Please enter: job_id, email_title, body and subject", "status": status.HTTP_400_BAD_REQUEST}, status.HTTP_400_BAD_REQUEST)


                job = Job.objects.get(pk=job_id)
                job_application = JobApplication.objects.create(
                    user=user,
                    job=job,
                    subject=subject,
                    email_title= email_title,
                    email_name=user.username,
                    body=body
                )
                hr_email = "mukhtar@jotcv.com"
                send_application_email.delay(subject, body, hr_email,email_title,user_email)

                return Response({'message': 'Job application submitted successfully'}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            db_logger.exception(e)
            return Response({"message": "Something went wrong", "status": status.HTTP_400_BAD_REQUEST}, status.HTTP_400_BAD_REQUEST)
            
class JobApplicationCreateView(generics.CreateAPIView):
    serializer_class = JobApplicationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        job_application = serializer.save()

        subject = job_application.subject
        body = job_application.body
        hr_email = "mukhtar@jotcv.com"  
        email_title = job_application.email_title
        user_email = job_application.user.email
        

        send_application_email.delay(subject, body, hr_email, email_title, user_email, job_application.id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    


class UserJobApplicationsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = self.request.user
        job_applications = JobApplication.objects.filter(user=user)
        
        serializer = UserAppliedJobSerializer(job_applications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class RelatedJobsView(APIView):
    def get(self,request,*args,**kwargs):
        title = request.GET.get('title')
        jobs = Job.objects.filter(title__icontains=title)[:5]
        serializer = JobSerializer(jobs,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class InvitationHrDeleteView(APIView):
    permission_classes = [IsAuthenticated]    
    def delete(self, request, invitation_id, *args, **kwargs):
        try:
            invitation_hr = JobApplication.objects.get(pk=invitation_id)
            invitation_hr.delete()

            return Response({'message': 'Invitation deleted successfully'}, status=status.HTTP_200_OK)
        except JobApplication.DoesNotExist:
            return Response({'error': 'Invitation not found'}, status=status.HTTP_404_NOT_FOUND)

class TestEmailView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = TestEmailSerializer(data=request.data)

        if serializer.is_valid():
            template_name = serializer.validated_data['template_name']
            subject = serializer.validated_data['subject']
            
            body = serializer.validated_data['body'].replace(r'\n', '\n')
            
            email = serializer.validated_data['email']

            send_test_email.delay(template_name, subject, body, email)

            return Response({'message': 'Test email sent successfully'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
