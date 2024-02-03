import logging
import json
import razorpay
from .models import *
from django.conf import *
from .serializer import *
from djmoney.money import Money
from django.conf import settings
from rest_framework import status
from datetime import datetime, timedelta
from rest_framework.views import APIView
from superuser.models import Subscription
from rest_framework.response import Response
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated

db_logger = logging.getLogger('db') 
date = datetime.today()


razorpay_key_id = settings.RAZOR_KEY_ID
razorpay_secret_key = settings.RAZOR_KEY_SECRET 

razorpay_client = razorpay.Client(auth=(razorpay_key_id, razorpay_secret_key))

class CreatePaymetAPI(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        try:
            try:
                plan_id = request.query_params.get("plan_id")
                plan= Subscription.objects.get(id=plan_id)
            except:
                return Response({"message":"Invalid plan","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')
            pay_amount= plan.amount.amount
            pay_currency = plan.amount.currency.code

            user = request.user
            data = {}
            full_name = user.first_name if user.first_name else "" + user.last_name if user.last_name else ""
            transaction = Transaction.objects.create(
                amount = pay_amount,
                name=full_name,
                ip_address=ip,
                email=request.user.email,
                mobile_no=request.user.mobile_no,
                user=request.user,
                plan_selected = plan
            )
            razorpay_order = razorpay_client.order.create(
                        {
                            "amount": int(pay_amount)*100,
                            "currency": "INR",
                            "receipt": str(transaction.id),
                            "payment_capture": "1",
                            "notes": {
                                f"plan_id-{transaction.plan_selected.id}":
                                f"Amount-{transaction.amount},for-{user.email}"},
                        }
                    )
            transaction.pay_order_id = razorpay_order['id']
            transaction.save()
            data = {
                "amount":pay_amount,
                "order_id":transaction.pay_order_id,
                "currency":pay_currency,
                "description":plan.title,
                "name":transaction.name,
                "email":transaction.email,
                "mobile":transaction.user.mobile_no, # todo -  we can get last success payment mobile no
            }
            return Response({'data': data}, status=status.HTTP_201_CREATED)
        except Exception as e:
            db_logger.exception(e)
            return Response({'error': "Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)


'''
callback url for webhook razorpay
'''
@csrf_exempt
def call_back_api(request):
    if request.method == "POST":
        try:
            if request.META['HTTP_X_RAZORPAY_SIGNATURE']:
                webhook_body = request.body.decode('utf-8')
                sec_key = settings.WEBHOOK_SECRET
                received_signature = request.META['HTTP_X_RAZORPAY_SIGNATURE']
                try:
                    match_sign = razorpay_client.utility.verify_webhook_signature(
                        webhook_body, received_signature, sec_key)
                    web_hook_json = json.loads(webhook_body)
                    if web_hook_json["event"] == "order.paid":
                        order_id = web_hook_json["payload"]["payment"]["entity"]["order_id"]
                        payment_id = web_hook_json["payload"]["payment"]["entity"]["id"]
                        # method = web_hook_json["payload"]["payment"]["entity"]["method"]
                        # captured = web_hook_json["payload"]["payment"]["entity"]["captured"]
                        # notes = web_hook_json["payload"]["payment"]["entity"]["notes"]
                        transaction_id = web_hook_json["payload"]["order"]["entity"]["receipt"]
                        payment_details = web_hook_json["payload"]["payment"]
                        mobile_no = web_hook_json["payload"]["payment"]["entity"]["contact"]
                        currency = web_hook_json["payload"]["payment"]["entity"]["currency"]
                except Exception as e:
                    db_logger.exception(e)
                    return JsonResponse({"message": "Can't find Payment", "status": status.HTTP_200_OK}, status=status.HTTP_200_OK)

                try:
                    transaction = Transaction.objects.get(id=transaction_id,pay_order_id=order_id)
                except Exception as e:
                    db_logger.exception(e)
                    return JsonResponse({"message": "Can't find Transaction", "status": status.HTTP_200_OK}, status=status.HTTP_200_OK)
                
                if match_sign:
                    if not transaction.payment_id:
                        transaction.payment_id = payment_id
                        transaction.signature_id = received_signature
                        transaction.is_paid = True
                        transaction.payment_json=payment_details
                        transaction.mobile_no=mobile_no
                        transaction.save()
                        # transaction.user.has_subscription = True
                        transaction.user.save()

                        try:
                            subs = UserSubscription.objects.get(transaction=transaction)
                        except:
                            # amount = Money(amount=transaction.amount, currency='USD')
                            transaction.user.user_subscription.filter(is_active=True).update(is_active=False)
                            expiry = date + timedelta(int(transaction.plan_selected.months * 30) + 
                                                      transaction.plan_selected.days) 

                            subs = UserSubscription.objects.create(
                                subscription=transaction.plan_selected,
                                transaction=transaction,
                                amount=transaction.amount,
                                user=transaction.user,
                                is_active=True,
                                expiring_on = expiry
                            )
                            transaction.user_subscription=subs
                            transaction.save()
                        ############ todo ############
                        # send email to user about successful payment
                        # and subscription details and activation
                    return JsonResponse(status.HTTP_200_OK, safe=False)
                else:
                    return JsonResponse(status.HTTP_200_OK, safe=False)
            else:
                return JsonResponse(status.HTTP_200_OK, safe=False)
        except Exception as e:
            db_logger.exception(e)
            return JsonResponse(status.HTTP_200_OK, safe=False)
    else:
        return JsonResponse(status.HTTP_200_OK, safe=False)


