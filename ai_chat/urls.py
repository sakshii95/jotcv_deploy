from django.urls import path
from .views import *

urlpatterns = [
    path("<int:prompt_id>", CreatePromptResponseAPI.as_view()),
    path("prompts/<int:prompt_type>", PromptsAPI.as_view()),
    path("prompts", PromptsAPI.as_view()),
    path('prompts/<int:pk>/', PromptDetailAPI.as_view()),

]