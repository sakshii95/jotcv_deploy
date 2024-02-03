
from django.urls import path
from .views import *
  
urlpatterns = [
    path('employer/', EmployerListAPIView.as_view()),
    path('employer/<int:pk>/', EmployerDetailAPIView.as_view()),
    path('jobs/', JobAPIView.as_view()),
    path('related-jobs/', RelatedJobsView.as_view()),
    path('jobs/<int:pk>/', JobUpdateAPIView.as_view()),
    path('job-newsteller/', SubscribeToJobNewsletter.as_view()),
    path('email-send', JobApplicationCreateView.as_view()),
    path('email-delete/<int:invitation_id>/', InvitationHrDeleteView.as_view()),
    path('send-test-email/', TestEmailView.as_view()),
    path('user/job-applications/', UserJobApplicationsView.as_view()),


]