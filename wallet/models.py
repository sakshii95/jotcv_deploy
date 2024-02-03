from django.db import models
from accounts.models import *
from superuser.models import Subscription
from djmoney.models.fields import MoneyField
from django.utils.translation import gettext_lazy as _

class Transaction(models.Model):
    amount            = MoneyField(max_digits=10, decimal_places=2,blank=True, null=True, default_currency='INR')
    is_paid           = models.BooleanField(default=False)
    user              = models.ForeignKey(User,related_name="user_transaction",on_delete=models.SET_NULL, blank=True, null=True)
    name              = models.CharField(_("Customer Name"), max_length=254, blank=True, null=True)

    ip_address        = models.GenericIPAddressField(null=True, blank=True)
    email             = models.EmailField("email address", blank=True, null=True)
    mobile_no         = models.CharField(max_length=16, null=True, blank=True)
    
    email_sent        = models.BooleanField(default=False)
    sms_sent          = models.BooleanField(default=False)

    pay_order_id      = models.CharField(_("Order ID"), max_length=60, blank=True, null=True)
    payment_id        = models.CharField(_("Payment ID"), max_length=60, blank=True, null=True)
    signature_id      = models.CharField(_("Signature ID"), max_length=128, blank=True, null=True)
    payment_json      = models.JSONField(blank=True, null=True)

    plan_selected     = models.ForeignKey(Subscription,on_delete=models.SET_NULL,null=True,blank=True,related_name="transaction_plan")
    user_subscription = models.ForeignKey('wallet.UserSubscription',on_delete=models.SET_NULL,null=True,blank=True,related_name="user_subscription")

    created_on        = models.DateTimeField(auto_now_add=True)
    updated_on        = models.DateTimeField(auto_now=True)

    class Meta:
        managed =True
    class Meta:
        ordering = ['-id']


class UserSubscription(models.Model):
    subscription    = models.ForeignKey(Subscription,related_name="subscription",on_delete=models.SET_NULL, blank=True, null=True)
    transaction     = models.OneToOneField(Transaction,related_name="transaction",on_delete=models.SET_NULL, blank=True, null=True)
    amount          = MoneyField(max_digits=10, decimal_places=2,blank=True, null=True, default_currency='INR')
    user            = models.ForeignKey(User,related_name="user_subscription",on_delete=models.SET_NULL, blank=True, null=True)
    expiring_on     = models.DateTimeField(auto_now_add=False,auto_now=False,null=True,blank=True)
    is_active       = models.BooleanField(default=False)
    created_on      = models.DateTimeField(auto_now_add=True)
    updated_on      = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True;
    class Meta:
        ordering = ['-id']
