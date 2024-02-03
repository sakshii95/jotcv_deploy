from celery import shared_task
from django.core.mail import send_mail
from accounts.models import User
from candidate.models import CandidateProfile
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from decouple import config
from datetime import datetime, timedelta
from django.core.management import call_command
import logging
from rest_framework.response import Response
from rest_framework import status
from mimetypes import guess_type
from os.path import basename
from company.models import JobApplication
from django.core.mail import EmailMultiAlternatives

from .job_alert_email import job_alert_email
from django.conf import settings
from django.http import HttpResponse

db_logger = logging.getLogger('db')


@shared_task
def send_welcome_email_task(user_id):
    try:
        user = User.objects.get(pk=user_id)
        recipient_list = [user.email]

        subject = 'Job Alert Email!'

        output_html = job_alert_email()
        email_message = EmailMultiAlternatives(
            subject=subject,
            body=output_html,
            from_email=config('EMAIL_HOST_USER'),
            to=recipient_list
        )
        email_message.content_subtype = "html"
        try:
            email_message.send(fail_silently=False)
        except Exception as e:
            db_logger.exception(e)
    except Exception as e:
        db_logger.exception(e)



# @shared_task
# def send_welcome_email_task(user_id):
#     try:
#         user = User.objects.get(pk=user_id)

#         subject = 'Welcome to our website!'  
#         from_email = config('EMAIL_HOST_USER')
#         recipient_list = [user.email]
        
#         html_message = render_to_string('email/welcome.html', {
#             'user': user,  
#         })


#         plain_message = strip_tags(html_message)

#         send_mail(
#             subject,  
#             plain_message, 
#             from_email, 
#             recipient_list, 
#             html_message=html_message, 
#         )

#     except Exception as e:
#         db_logger.exception(e)
        
@shared_task
def send_profile_update_notification(id):
    try:
        user_profile = CandidateProfile.objects.get(id=id)
        last_notification_time = user_profile.last_notification_time or datetime.min

        min_datetime = datetime.min.replace(tzinfo=last_notification_time.tzinfo)   
        db_logger.info(min_datetime)
        db_logger.info(last_notification_time)

        if (last_notification_time == min_datetime or last_notification_time.date() == datetime.now().date()) and user_profile.notification_count < 2:

            subject = 'Welcome to our website!'  

            from_email = config('EMAIL_HOST_USER')
            recipient_list = [user_profile.email]

            html_message = render_to_string('email/reminder.html', {
                'user': user_profile,  
            })

            plain_message = strip_tags(html_message)

            send_mail(
                subject,  
                plain_message, 
                from_email, 
                recipient_list, 
                html_message=html_message, 
            )
            user_profile.last_notification_time = datetime.now()
            user_profile.notification_count += 1
            user_profile.save()
    except Exception as e:
        db_logger.exception(e)


@shared_task
def send_news_teller_task(email):
    user = User.objects.get(email=email)
    username = user.username
    db_logger.info(username)

    subject = 'Welcome to JotCV!'
    from_email = config('EMAIL_HOST_USER')
    recipient_list = [email]
    html_message = render_to_string('email/newsteller.html',{'username': username})

    plain_message = strip_tags(html_message)

    send_mail(
        subject,
        plain_message,
        from_email,
        recipient_list,
        html_message=html_message,
    )



@shared_task
def check_subscription_status():
    call_command('check_subscription_status')
    

@shared_task
def send_application_email(subject, body, hr_email, email_title, user_email, job_application_id):
    try:
        from_email = user_email
        recipient_list = [hr_email]

        html_message = render_to_string('email/invitation_email.html', {'email_title': email_title, 'subject': subject, 'body': body})

        text_message = strip_tags(html_message)

        email = EmailMultiAlternatives(
            subject=subject,
            body=text_message,
            from_email=from_email,
            to=recipient_list,
        )

        email.attach_alternative(html_message, "text/html")

        try:
            job_application = JobApplication.objects.get(pk=job_application_id)
            if job_application.pdf_file:
                pdf_file = job_application.pdf_file
                pdf_file.open()
                email.attach(basename(pdf_file.name), pdf_file.read(), guess_type(pdf_file.name)[0])
                pdf_file.close()

        except JobApplication.DoesNotExist:
            db_logger.error(f"Job Application with id {job_application_id} does not exist")

        email.send()
    except Exception as e:
        db_logger.exception(e)

@shared_task
def send_test_email(template_name, subject, body, email):
    from_email = config('EMAIL_HOST_USER')
    recipient_list = [email]

    html_message = render_to_string('email/invitation_email.html', {'subject': subject, 'body': body})

    plain_message = strip_tags(html_message)

    send_mail(
        subject,
        plain_message,
        from_email,
        recipient_list,
        html_message=html_message,
    )