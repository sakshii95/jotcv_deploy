# serializers.py

from rest_framework.serializers import ModelSerializer,SerializerMethodField 
from .models import *
from superuser.serializer import SubscriptionSerializer


class UserSubscriptionSerializer(ModelSerializer):
    subscription = SubscriptionSerializer(read_only=True)
    has_subscription = SerializerMethodField(read_only=True)

    class Meta:
        model = UserSubscription
        exclude = ('user', 'updated_on')

    def get_has_subscription(self, instance):
        return instance.user.has_subscription
