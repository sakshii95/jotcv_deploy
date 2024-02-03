

from django.urls import path
from .views import *

app_name = 'dblogger'


urlpatterns = [
    path('all-loggs/', Loggs, name='loggs'),
    path('log-view/', LogView, name='log_view'),
    path('delete-logs/', DeleteLogs, name='delete_log'),

    ]
