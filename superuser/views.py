import logging
from .models import *
from .serializer import *
from django.db.models import Q
from candidate.models import *
from company.models import Job
from django.http import Http404
from rest_framework import status
from rest_framework import generics
from django.views.generic import View
from rest_framework.views import APIView
from api.serializer import LoginSerializer
from rest_framework.response import Response
from company.serializer import JobSerializer
from django.shortcuts import render, redirect
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.pagination import PageNumberPagination
from candidate.serializers import CandidateProfileSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from wallet.models import *
from django.utils import timezone
from django.db.models import Sum
from django.db.models.functions import TruncMonth

db_logger = logging.getLogger('db') 

class AllCategoriesAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        categories = Category.objects.filter(is_active=True,)
        data = CategorySerializer(categories,many=True).data
        return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
    
class AllSubCategoriesAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk):
        try:
            category = Category.objects.get(id=pk,)
            sub_categories = SubCategories.objects.filter(category=category,)
            data = SubCategoriesSerializer(sub_categories,many=True).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"message":"No data found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

'''
education
'''
class SubscriptionAPI(APIView):
    def get(self, request, format=None):
        try:
            try:
                plan = Subscription.objects.filter(is_active=True).order_by("id")
            except:
                return Response({"message":"Plan not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
            data = SubscriptionSerializer(plan,many=True,context={"request":request}).data

            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)



######################################################################
############################## ADMIN #################################
############################## VIEWS #################################
######################################################################

class SubscriptionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        subscriptions = Subscription.objects.all()
        serializer = SubscriptionSerializer(subscriptions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, *args, **kwargs):
        subscription_id = request.data.get('id')

        try:
            subscription = Subscription.objects.get(pk=subscription_id)
        except Subscription.DoesNotExist:
            raise Http404("Subscription not found")

        features_data = request.data.get('features', [])
    
        data = request.data.copy()

        serializer = SubscriptionUpdateSerializer(subscription, data=request.data,context={'features': features_data}, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CustomPageNumberPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class AllUsersAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LoginSerializer  
    pagination_class = CustomPageNumberPagination

    def get_queryset(self):
        users = User.objects.filter(is_superuser=False).order_by("-id")
        query = self.request.GET.get("q", "")
        
        if query:
            query_int = self.try_parse_int(query)
            q_objects = (
                Q(id=query_int) | Q(mobile_no=query) |
                Q(first_name__icontains=query) | Q(last_name__icontains=query) |
                Q(email__icontains=query)
            )

            users = users.filter(q_objects).order_by("-id").distinct()

        return users

    def try_parse_int(self, value):
        try:
            return int(value)
        except ValueError:
            return None
    
class UserSubscriptionListAPIView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UserSubscription.objects.all()
    serializer_class = UserSubscriptionSerializer

class AdminLoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({"message": "Please provide both email and password"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"message": "Invalid email or password for admin"}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_superuser:
            return Response({"message": "Invalid email or password for admin"}, status=status.HTTP_401_UNAUTHORIZED)

        if not check_password(password, user.password):
            return Response({"message": "Invalid email or password for admin"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Admin login successful",
            "access_token": str(refresh.access_token),
            "user": UserSerializer(user).data,
        }, status=status.HTTP_200_OK)
    
class UsersDetailsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, user_id):
        data = {}
        try:
            user = User.objects.get(id=user_id)
            data = UsersSerializer(user).data
            user_profiles = user.cv_profiles.all()
            data["profile_data"]=CandidateProfileSerializer(user_profiles, many=True).data
            return Response({"data":data,"status":status.HTTP_200_OK}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileAdminView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_400_BAD_REQUEST)

        user_profiles = user.cv_profiles.all()
        serializer = CandidateProfileSerializer(user_profiles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class CustomJobPagination(PageNumberPagination):
    page_size = 80
    max_page_size = 80
 


class JobListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAdminUser]
    queryset = Job.objects.all().order_by('id')
    serializer_class = JobSerializer
    pagination_class = CustomJobPagination

class JobDetailView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAdminUser]
    queryset = Job.objects.all().order_by('id')
    serializer_class = JobSerializer

class DashboardAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        current_year = timezone.now().year
        total_users = User.objects.count()
        total_profiles = CandidateProfile.objects.count()
        total_subscriptions = UserSubscription.objects.count()
        total_amount_received = Transaction.objects.filter(is_paid=True).aggregate(Sum('amount'))['amount__sum'] or 0
        month_wise_data = Transaction.objects.filter(
            is_paid=True,
            created_on__year=current_year
        ).annotate(
            month=TruncMonth('created_on')
        ).values(
            'month'
        ).annotate(
            total_amount=Sum('amount')
        ).order_by('month')

        response_data = {
            'total_users': total_users,
            'total_profiles': total_profiles,
            'total_subscriptions': total_subscriptions,
            'total_amount_received': total_amount_received,
            'monthly_data': list(month_wise_data),
            "status":status.HTTP_200_OK
        }

        return Response(response_data, status=status.HTTP_200_OK)