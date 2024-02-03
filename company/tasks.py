from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from decouple import config
import logging
from accounts.models import User

db_logger = logging.getLogger('db')

@shared_task
def send_job_newsletter_task(email):
    user = User.objects.get(email=email)
    username = user.username
    subject = 'Welcome to our job newsletter!'
    from_email = config('EMAIL_HOST_USER')
    recipient_list = [email]
    db_logger.info(username)
    html_message = render_to_string('email/job_newsteller.html',{'user': username}) 

    plain_message = strip_tags(html_message)

    send_mail(
        subject,
        plain_message,
        from_email,
        recipient_list,
        html_message=html_message,
    )
