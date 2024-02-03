from django.contrib import admin
from .models import User
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = [
        "email",
        "id",
        "first_name",
        "last_name",
        "is_active",
        "user_type",
        "created_at",
    ]
admin.site.register(User,UserAdmin)
