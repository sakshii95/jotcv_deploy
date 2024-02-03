from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import *
from superuser.serializer import CategorySerializer

class ResumeSubCategoriesSerializer(ModelSerializer):
    category = CategorySerializer(read_only=True)
    resumes_count = SerializerMethodField(read_only = True)
    class Meta:
        model = SubCategories
        exclude = ('created_by','created_on','updated_on','is_active' )
    def get_resumes_count(self,sub_category):
        try:
            return sub_category.template_category.all().count()
        except:
            return 0

class ContactMessageSerializer(ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']
