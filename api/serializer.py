from accounts.models import *
from rest_framework import serializers as Serializers
from wallet.serializer import UserSubscriptionSerializer
from .models import Subscriber


class LoginSerializer(Serializers.ModelSerializer):
    subscription       = Serializers.SerializerMethodField("get_subscription", read_only=True)

    class Meta:
        model = User
        exclude = ('user_permissions','groups','updated_at','is_superuser','is_staff','is_active','password','date_joined'  ) 

    def get_subscription(self, user):
        try:
            subscriptions = user.user_subscription.filter(is_active=True)
            # if not subscriptions:
            #     return None
            # elif user.has_subscription==False:
            #     user.has_subscription=True
            #     user.save()
            subscription  = subscriptions.first()
            return UserSubscriptionSerializer(subscription).data
        except:
            return None
        
class SubscriberSerializer(Serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['email']
