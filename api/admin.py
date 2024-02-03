from django.contrib import admin
from .models import *


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("id", 'email')