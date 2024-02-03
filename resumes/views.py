import logging
from .models import *
from .serializer import *
from superuser.models import *
from superuser.serializer import *
from rest_framework import status
from django.contrib import messages
from django.views.generic import View
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import redirect, render
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from candidate.models import CandidateProfile
from django.db.models import Q
from candidate.serializers import *
from accounts.models import User

db_logger = logging.getLogger('db')

class ResumeSubCategoriesAPI(APIView):
    '''Sub categories API'''
    permission_classes = [IsAuthenticated]
    def get(self, request,pk):
        try:
            category = Category.objects.get(id=pk,)
            sub_categories = SubCategories.objects.filter(category=category,)
            data = ResumeSubCategoriesSerializer(sub_categories,many=True).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"message":"No data found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)


portfolio = {1:"Modern",2:"Basic",3:"Developer",4:"Classic",5:"Creative",6:"NewModern",7:"Excellent",8:"Virtual",9:"PreModern",10:"myport",11:"Proman",12:"Steller",13:"DevModern",14:"DevFolio",15:"Kards"}


class ProfileWebPortfolioAPI(APIView):
    def get(self, request,username, format=None):
        
        try:
         

            user = User.objects.get(Q(username__iexact=username.lower())|Q(email=username.lower()))
            try:
                primary_id = user.web_portfolio["primary_id"]
            except:
                user.web_portfolio["primary_id"] =1
            try:
                profile_id = user.web_portfolio["profile_id"]
                profile = CandidateProfile.objects.get(id=profile_id)
            except:
                profile= CandidateProfile.objects.filter(created_by=user)
                if profile.count() == 0:
                    return Response({"message":"Create profile first","status":status.HTTP_403_FORBIDDEN},status.HTTP_403_FORBIDDEN)
                profile = profile.first()
                user.web_portfolio["profile_id"]=profile.id
            user.save()
            context = {"profile_id":user.id}
            return render(request, f'webportfolio/{portfolio[user.web_portfolio["primary_id"]]}/index.html',context)
        except User.DoesNotExist:
            pass
        except Exception as e:
            db_logger.exception(e)
            print(e)
        return Response({"message":"Pofile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

class ContactUsAPIView(APIView):
    def post(self, request, format=None):
        try:
            serializer = ContactMessageSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Contact form submitted successfully", "status": status.HTTP_201_CREATED}, status.HTTP_201_CREATED)
            else:
                return Response({"message": "Invalid data", "status": status.HTTP_400_BAD_REQUEST}, status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"message": str(e), "status": status.HTTP_500_INTERNAL_SERVER_ERROR}, status.HTTP_500_INTERNAL_SERVER_ERROR)