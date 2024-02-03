from django.contrib import admin
from .models import Prompt
class PromptAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "prompt_text",
        "prompt_type",
        "updated_at",
    ]
admin.site.register(Prompt,PromptAdmin)