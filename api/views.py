import logging
from accounts.models import User
from rest_framework import status
from django.core.files import File
from urllib.request import urlopen
# from fcm_django.models import FCMDevice
from tempfile import NamedTemporaryFile
from .serializer import LoginSerializer, SubscriberSerializer
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from candidate.models import CandidateProfile
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter,AppleOAuth2Client,AppleProvider
from decouple import config
from .tasks import send_welcome_email_task
from .models import Subscriber
from .tasks import send_news_teller_task,send_profile_update_notification
from django.db.models.signals import post_save
from django.shortcuts import render

db_logger = logging.getLogger('db') 

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "/api/auth/callback/google"
    client_class = OAuth2Client
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter,AppleOAuth2Client,AppleProvider
from dj_rest_auth.registration.views import SocialLoginView as AppleLoginView

class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter
    callback_url = '/api/auth/callback/apple/'
    client_class = OAuth2Client
# class AppleLogin(AppleLoginView):
#     adapter_class = AppleOAuth2Adapter
#     callback_url = 'https://anycallbackurlhere'
#     client_class = AppleOAuth2Client

class UserProfileAPI(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        user = request.user
        data = LoginSerializer(user).data
        return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)

    def post(self, request, format=None):
        try:
            user = request.user
            if not request.data.get("first_name") or not request.data.get("last_name"):
                return Response({"message":"enter first and last name","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
            else:
                user.first_name  = request.data.get("first_name")
                user.last_name  = request.data.get("last_name")

            if request.data.get("designation",None):
                user.designation = request.data.get("designation")

            if request.data.get("gender",None):
                user.gender = request.data.get("gender")

            if request.data.get("dob",None):
                user.dob = request.data.get("dob")

            if  request.data.get("mobile_no",None):
                user.mobile_no=request.data.get("mobile_no")

            user.save()
            if  request.FILES.get("profile_picture",None):
                user.profile_picture=request.FILES.get("profile_picture")
            user.save()
            return Response({"message":"Profile updated successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)

        except Exception as e:
            db_logger.exception(e)
            return Response({"message":str(e),"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

class DeleteUserAPI(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        try:
            user = User.objects.get(id=request.user.id)
            user.delete()
        except:
            pass
        return Response({"message":"Your account has been deleted successfully.","status":status.HTTP_200_OK},status.HTTP_200_OK)



class UpdateProfilePictureAPI(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, format=None):
        try:
            user = request.user 
            if not request.user.profile_picture:
                url = user.socialaccount_set.all().first().extra_data['picture']
                img_temp = NamedTemporaryFile(delete=True)
                img_temp.write(urlopen(url).read())
                img_temp.flush()
                user.profile_picture.save(f"image_{user.id}.png", File(img_temp))
                user.save()
            try:
                primary_id = user.web_portfolio["primary_id"]
            except:
                user.web_portfolio["primary_id"] =1
            try:
                profile_id = user.web_portfolio["profile_id"]
            except:
                profile= CandidateProfile.objects.filter(created_by=request.user)
                profile_id = profile.first().id
                user.web_portfolio["profile_id"]=profile_id
            user.save()
        except Exception as e:
            db_logger.exception(e)
        return Response({"status":status.HTTP_200_OK},status.HTTP_200_OK)

 
 




@receiver(user_logged_in)
def send_welcome_email(sender, request, user, **kwargs):
    if user.is_first_login and user.is_superuser is False:
        user.is_first_login = False
        user.save()
        send_welcome_email_task.delay(user.id)

@receiver(post_save, sender=CandidateProfile)
def user_profile_updated(sender, instance, **kwargs):
    send_profile_update_notification.delay(instance.id)


class SubscribeToNewsletter(APIView):
    def post(self, request, format=None):
        try:
            email = request.data.get("email")

            if not email:
                return Response({"message": "Email is required for subscription", "status": status.HTTP_400_BAD_REQUEST}, status.HTTP_400_BAD_REQUEST)

            if Subscriber.objects.filter(email=email).exists():
                return Response({"message": "Email is already subscribed", "status": status.HTTP_400_BAD_REQUEST}, status.HTTP_400_BAD_REQUEST)

            subscriber_data = {'email': email}
            serializer = SubscriberSerializer(data=subscriber_data)

            if serializer.is_valid():
                serializer.save()
                send_news_teller_task.delay(email)
                return Response({"message": "Subscribed successfully", "status": status.HTTP_201_CREATED}, status.HTTP_201_CREATED)
            else:
                return Response({"message": "Invalid data", "status": status.HTTP_400_BAD_REQUEST}, status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"message": str(e), "status": status.HTTP_500_INTERNAL_SERVER_ERROR}, status.HTTP_500_INTERNAL_SERVER_ERROR)
