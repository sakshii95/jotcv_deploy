from django.contrib import admin
from .models import *
from django.utils.text import Truncator


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):

    list_display = ("id", "name")

@admin.register(JobCategory)
class JobCategoryAdmin(admin.ModelAdmin):

    list_display = ("id", "name")

@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):

    list_display = ("id", "user","job","pdf_file","status")


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ("id", "logo", "tagline", "founded","name","employee_count","note",'email','phone_number','address')


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    def short_description(self, obj):
        return Truncator(obj.description).chars(100)

    short_description.short_description = 'Description'
    list_display = ("id","title","gender","locations","company","short_description","min_exp","max_exp","job_function","internship")

@admin.register(JobSubscriber)
class JobSubscriberAdmin(admin.ModelAdmin):

    list_display = ("id", "email")