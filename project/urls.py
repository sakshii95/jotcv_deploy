from django.contrib import admin
from django.urls import path, include
from resumes.views import ProfileWebPortfolioAPI,ContactUsAPIView


urlpatterns = [
    path("api/auth/", include("api.urls")),
    path("admin/", admin.site.urls),
    path('', include('frontend.urls')),
    path('api/main/', include('superuser.urls')),
    path('api/resumes/', include('resumes.urls')),
    path('api/candidate/', include('candidate.urls')),
    path('api/wallet/', include('wallet.urls')),
    path('api/chat/', include('ai_chat.urls')),
    path('api/company/', include('company.urls')),
    path('<str:username>', ProfileWebPortfolioAPI.as_view()),
    path('contact/', ContactUsAPIView.as_view()),


]
