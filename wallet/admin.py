from django.contrib import admin
from .models import*
    
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("id", 'amount',"is_paid","user", "payment_id","plan_selected","created_on")

@admin.register(UserSubscription)
class UserSubscriptionAdmin(admin.ModelAdmin):
    list_display = ("id", 'subscription',"user",'amount',"expiring_on","is_active","created_on")
    