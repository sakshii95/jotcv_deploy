# models.py

from django.db import models
from accounts.models import User
from djmoney.models.fields import MoneyField
from candidate.models import CandidateProfile
from django.utils.translation import gettext_lazy as _

class Skill(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    class Meta:
        ordering = ['-id']

class JobCategory(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name  
    class Meta:
        ordering = ['-id']

class Company(models.Model):
    logo = models.FileField(upload_to='company_logos/%Y/%m/%d/', null=True, blank=True)
    tagline = models.TextField(null=True, blank=True)
    founded = models.PositiveIntegerField(null=True, blank=True)
    name = models.CharField(max_length=500,null=True, blank=True)
    employee_count = models.PositiveIntegerField(null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    email = models.CharField(max_length=156,null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    def __str__(self):
        return self.name
    class Meta:
        ordering = ['-id']

class Job(models.Model):
    GENDER_CHOICES = [
        (1, 'Male'),
        (2, 'Female'),
        (3, 'Other'),
        (4, 'Any'),
    ]

    title = models.CharField(max_length=255, null=True, blank=True)
    gender = models.PositiveIntegerField(choices=GENDER_CHOICES,default=4)
    locations = models.TextField(null=True, blank=True)
    skills = models.ManyToManyField(Skill,related_name='jobs', blank=True)
    salary = MoneyField(max_digits=10, decimal_places=2,blank=True, null=True, default_currency='INR', help_text="Salary per annum in LPA")

    description = models.TextField(null=True, blank=True)
    min_exp = models.IntegerField(null=True, blank=True)
    max_exp = models.IntegerField(null=True, blank=True)
    job_function = models.CharField(max_length=255, null=True, blank=True)
    job_category = models.ForeignKey(JobCategory, on_delete=models.CASCADE, null=True, blank=True)  
    is_active   = models.BooleanField(default=True)
    hr_contact_email = models.EmailField(null=True, blank=True)
    hr_name = models.CharField(max_length=255, null=True, blank=True)
    internship = models.BooleanField(default=False)

    company = models.ForeignKey(Company,related_name='jobs', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['-id']


class JobApplication(models.Model):
    status_CHOICES = [
        (1, 'Applied'),
        (2, 'NotApplied')
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name = "job_application",null=True, blank=True)
    job = models.ForeignKey(Job, on_delete=models.CASCADE,related_name = "job_application",null=True, blank=True)
    profile = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE,related_name = "job_application",null=True, blank=True)
    subject = models.CharField(max_length=255,null=True, blank=True)
    email_title = models.CharField(max_length=255,null=True, blank=True)
    email_name = models.CharField(max_length=255,null=True, blank=True)
    body = models.TextField(null=True, blank=True)
    pdf_file = models.FileField(upload_to='jobApplications/%Y/%m/%d/',null=True,blank=True)
    status = models.PositiveIntegerField(choices=status_CHOICES, default=1)
    created_at = models.DateTimeField(auto_now_add=True,null=True)

    class Meta:
        ordering = ['-id']
    def __str__(self):
        return self.subject


class JobSubscriber(models.Model):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email
    class Meta:
        ordering = ['-id']