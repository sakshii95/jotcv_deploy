from django.contrib import admin
from django.urls import path
from .views import *

admin.autodiscover()
app_name = 'frontend'
urlpatterns = [
    path('', index, name='index'),
]
