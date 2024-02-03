from django.contrib import admin
from .models import *
from django.utils.html import mark_safe
from markdown import markdown

@admin.register(CandidateProfile)
class CandidateProfileAdmin(admin.ModelAdmin):
    list_display = ("id", 'type',"full_name","email", "created_at")


@admin.register(CandidateEducation)
class CandidateEducationAdmin(admin.ModelAdmin):
    list_display = ("id", 'profile',"course","university", "created_at")
    
@admin.register(CandidateExperience)
class CandidatePriviousWorkExperienceAdmin(admin.ModelAdmin):
    list_display = ("id", 'profile',"company_name","designation","is_current", "created_at")

@admin.register(CandidateProjects)
class CandidateProjectsAdmin(admin.ModelAdmin):
    list_display = ("id", 'profile', 'title',"created_at")

@admin.register(CandidateInterest)
class CandidateInterestAdmin(admin.ModelAdmin):
    list_display = ("id", 'profile',"interest", "created_at")

@admin.register(CandidateSkills)
class CandidateSkillsAdmin(admin.ModelAdmin):
    list_display = ("id", 'profile',"skill","type", "created_at")

@admin.register(CandidateCertification)
class CandidateCertificationAdmin(admin.ModelAdmin):
    list_display = ("id", 'profile',"certificate", "created_at")


@admin.register(CandidateSpokenLanguages)
class CandidateSpokenLanguagesAdmin(admin.ModelAdmin):
    list_display = ("id", 'profile',"language","can_read","can_write","can_speak", "created_at")

@admin.register(CandidateSocialProfile)
class CandidateSocialProfileAdmin(admin.ModelAdmin):
    list_display = ("id", 'profile',"name","link", "created_at")


# videos 
@admin.register(VideoQuestion)
class VideoQuestionAdmin(admin.ModelAdmin):
    list_display = ("id",'question',"category", "created_at")
    
@admin.register(VideoAnswer)
class VideoAnswerAdmin(admin.ModelAdmin):
    list_display = ("id", 'profile_id', "check_video_file",'question','question_id', "created_at")
    def check_video_file(self, obj):
        if obj.video:
            return "Uploaded"
        else:
            return "No"

    check_video_file.short_description = 'Video Uploaded'
    
    
@admin.register(SectionVideo)
class SectionVideoAdmin(admin.ModelAdmin):
    list_display = ("id", 'section', "created_at")
    




# @admin.register(UserProfile)
# class UserProfileAdmin(admin.ModelAdmin):
#     list_display = ("user", "display_applicants")

#     def display_applicants(self, obj):
#         return ", ".join([str(job) for job in obj.applicants.all()])

#     display_applicants.short_description = "Applicants"

# CandidateProjects
# CandidateSocialProfile
# VideoQuestion
# VideoAnswer
# SectionVideo