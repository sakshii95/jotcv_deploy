
from django.urls import path
from .views import *
  
urlpatterns = [
    path('all-profiles', AllProfileView.as_view()),
    path('profile', ProfileAPI.as_view()),
    path('profile/<int:pk>', ProfileAPI.as_view()),
    path('profile-name/<int:profile_id>', ProfileNameAPI.as_view()),
    path('full-profile/<int:pk>', ProfileFullDetailsAPI.as_view()),
    path('web-profile/<int:pk>', ProfileWebPortfolioAPI.as_view()),
    path('web-portfolio', WebProfileAPI.as_view()),

    # education
    path('education', CandidateEducationAPI.as_view()),
    path('education/<int:pk>', CandidateEducationAPI.as_view()),
    path('education-list/<int:pk>', CandidateAllEducationAPI.as_view()),

    #experience
    path('experience', CandidateExperienceAPI.as_view()),
    path('experience/<int:pk>', CandidateExperienceAPI.as_view()), 
    path('experience-list/<int:pk>', CandidateAllExperiencesAPI.as_view()),

    #projects
    path('project', CandidateProjectsAPI.as_view()),
    path('project/<int:pk>', CandidateProjectsAPI.as_view()), 
    path('project-list/<int:pk>', CandidateAllProjectsAPI.as_view()),

    #interest
    path('interest', CandidateInterestAPI.as_view()),
    path('interest/<int:pk>', CandidateInterestAPI.as_view()), 

    #skills
    path('skill', CandidateSkillsAPI.as_view()),
    path('skills/<int:pk>', CandidateSkillsAPI.as_view()), 

    #interest
    path('certificate', CandidateCertificationAPI.as_view()),
    path('certificates/<int:pk>', CandidateCertificationAPI.as_view()), 

    #language
    path('language', CandidateLanguagesAPI.as_view()),
    path('languages/<int:pk>', CandidateLanguagesAPI.as_view()), 

    #social
    path('social', CandidateSocialAPI.as_view()),
    path('social/<int:pk>', CandidateSocialAPI.as_view()), 

    # videos
    path('video-questons', QuestionVideosListAPI.as_view()),
    path('video-answer-list/<int:pk>', VideosAnswersListAPI.as_view()),
    path('video-answer/<int:pk>', VideosAnswersAPI.as_view()),
    # sectio videos
    path('all-sections', SectionsAPI.as_view()),
    path('section-video', SectionVideosAPI.as_view()),
    path('section-video/<int:pk>', SectionVideosAPI.as_view()),

    # CUstom Videos
    path('custom-video', CustomVideosAPI.as_view()),
    path('custom-video/<int:pk>', CustomVideosAPI.as_view()),




]