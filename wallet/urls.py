# urls.py

from django.urls import path
from .views import *

urlpatterns = [
    path('create-payment', CreatePaymetAPI.as_view(), name='create_payment'),
    path("payment/webhook/callback", call_back_api, name="razorpay_call_back"),
]
