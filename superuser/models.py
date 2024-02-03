from django.db import models
from accounts.models import *
from ckeditor.fields import RichTextField
from djmoney.models.fields import MoneyField

class Section(models.Model):
    title       = models.CharField(max_length=150, null=True,blank=True)
    description = models.TextField(null=True,blank=True)

    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True, null=True)
    updated_at  = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']
    def __str__(self):
        return self.title
    
    
class Category(models.Model):
    title       = models.CharField(max_length=200, null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    is_active   = models.BooleanField(default=True)
    created_on  = models.DateTimeField(auto_now_add=True)
    image       = models.FileField(null=True, blank=True, upload_to="category/images/")
    ranked      = models.PositiveIntegerField(null=True,blank=True)
    updated_on  = models.DateTimeField(auto_now=True)
    created_by  = models.ForeignKey(User,related_name="category_created_by",on_delete=models.DO_NOTHING)
    class Meta:
        ordering = ['-id']
    def __str__(self):
        return self.title
        
class SubCategories(models.Model):
    category        = models.ForeignKey(Category, on_delete=models.DO_NOTHING, null=True, related_name="subcategories")
    title           = models.CharField(max_length=200, null=True, blank=False)
    description     = models.TextField(null=True,blank=True)
    is_active       = models.BooleanField(default=True)
    created_on      = models.DateTimeField(auto_now_add=True)
    ranked          = models.PositiveIntegerField(null=True,blank=True)
    updated_on      = models.DateTimeField(auto_now=True)
    created_by      = models.ForeignKey(User,related_name="subcategory_created_by",on_delete=models.DO_NOTHING)
    class Meta:
        ordering = ['-id']
    def __str__(self):
        return self.title + ">>" + self.category.title

"""
subscription
"""
class Features(models.Model):
    title       = models.TextField(blank=True)
    updated_on  = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.title
    class Meta:
        ordering = ['-id']
        
class Subscription(models.Model):
    title       = models.CharField(max_length=100) 
    amount      = MoneyField(max_digits=10, decimal_places=2,blank=True, null=True, default_currency='INR')
    description = RichTextField(blank=True, null=True)
    features    = models.ManyToManyField(Features, blank=True)
    is_active   = models.BooleanField(default=True)
    created_on  = models.DateTimeField(auto_now_add=True)
    updated_on  = models.DateTimeField(auto_now=True)
    months      = models.PositiveIntegerField(default=0)
    days        = models.PositiveIntegerField(default=0)
    class Meta:
        managed = True
    def __str__(self):
        return self.title
    