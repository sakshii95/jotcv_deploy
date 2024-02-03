from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from .constants import *

number = RegexValidator(r'^^(\+\d{1,3})?,?\s?\d{9,12}', 'Only numbers are allowed.')
class User(AbstractUser):
    """User model."""
    email           = models.EmailField(_('email address'), unique=True)
    gender          = models.PositiveIntegerField(choices=GENDER, default=1)
    dob             = models.DateField(auto_now_add=False,auto_now = False,blank=True, null=True)
    profile_picture = models.FileField(null=True, upload_to="profile_pictures/%Y/%m/%d/", blank=True)
    user_type       = models.IntegerField(choices=USER_ROLE,default=USER, null=True, blank=False)
    is_first_login  = models.BooleanField(default=True)
    mobile_no       = models.CharField(max_length=16,validators=[number],blank=True,null=True)
    is_deleted      = models.BooleanField(default=False)
    deleted_date    = models.DateField(auto_now_add=False,auto_now = False,blank=True, null=True)
    delete_reason   = models.TextField(null=True,blank=True)
    designation     = models.CharField(max_length=80,null=True,blank=True)
    created_at      = models.DateTimeField(auto_now_add=True, null=True)
    updated_at      = models.DateTimeField(auto_now=True, null=True)
    # has_subscription= models.BooleanField(default=False)
    web_portfolio   = models.JSONField(default=dict,null=True,blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username',]
    