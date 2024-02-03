from django.urls import path,re_path
from .views import *

app_name = 'superuser'

urlpatterns = [
    path('all-categories', AllCategoriesAPI.as_view()),
    path('sub-categories/category-<int:pk>', AllSubCategoriesAPI.as_view()),

    path('subscriptions', SubscriptionAPI.as_view()),
    path('subscription-details', SubscriptionAPIView.as_view()),
    path('subscription-details/<int:subscription_id>/', SubscriptionAPIView.as_view()),


    ########## Admin views ###############
    path('all-users/', AllUsersAPIView.as_view(), name='all-users-api'),
    path('user-subscriptions/', UserSubscriptionListAPIView.as_view()),
    path('admin-login/', AdminLoginAPIView.as_view(), name='admin-login'),
    path('user/<int:user_id>/', UsersDetailsView.as_view(), name='user-details'),


    path('user-profiles/<int:user_id>/', UserProfileAdminView.as_view()),
    path('jobs/', JobListCreateView.as_view()),
    path('jobs/<int:pk>/', JobDetailView.as_view()),

    path('dashboard', DashboardAPIView.as_view()),
] 
