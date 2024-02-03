from django.urls import path
from .views import *


urlpatterns = [
    path("google/", GoogleLogin.as_view(), name="google_login"),
    path('apple/', AppleLogin.as_view(), name='apple_login'),

    path('profile', UserProfileAPI.as_view()),
    path('delete/user', DeleteUserAPI.as_view()),
    path('update-user-pic', UpdateProfilePictureAPI.as_view()),
    path('subscribe_to_newsletter/', SubscribeToNewsletter.as_view(), name='subscribe_to_newsletter'),
]
