from django.urls import path, re_path
from .views import *

app_name = 'resume'

urlpatterns = [
    path('sub-categories/category-<int:pk>', ResumeSubCategoriesAPI.as_view()),
] 