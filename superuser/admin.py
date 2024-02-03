from django.contrib import admin
from .models import *

@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ("id", 'description', "created_at")

    
@admin.register(Category)
class ResumeCategoryAdmin(admin.ModelAdmin):
    list_display = ("id", 'title',"is_active", "ranked","created_on")
    
    
@admin.register(SubCategories)
class ResumeSubCategoriesAdmin(admin.ModelAdmin):
    list_display = ("id", 'category',"title","is_active", "created_on")

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ("id", 'title','amount',"created_on")

@admin.register(Features)
class FeaturesAdmin(admin.ModelAdmin):
    list_display = ("id", 'title')


