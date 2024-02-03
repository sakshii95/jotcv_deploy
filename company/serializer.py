from .models import *
# from superuser.models  import *
# from ..serializer  import *
from rest_framework import serializers

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('name',)

class JobCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCategory
        fields = ('name',)

class JobSerializer(serializers.ModelSerializer):

    company_name = serializers.CharField(source='company.name', read_only=True)
    # hr_contact_email = serializers.CharField(source='company.email', read_only=True)
    company_logo = serializers.FileField(source='company.logo', read_only=True)

    skills = SkillSerializer(many=True, read_only=True)
    job_category = JobCategorySerializer(read_only=True)

    class Meta:
        model = Job
        fields = ('id','title', 'gender','salary', 'locations', 'skills', 'description', 'description','company_name','hr_contact_email','company_logo','min_exp','max_exp','job_category','job_function','hr_name')

class JobUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = ('id','title', 'gender','salary', 'locations', 'description', 'status', 'description','min_exp','max_exp','job_function','hr_name')



class EmployerSerializer(serializers.ModelSerializer):
    jobs = JobSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ('id', 'name', 'logo', 'email','jobs','tagline','founded','employee_count','note','phone_number','address')


class JobSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSubscriber
        fields = ['email']

class EmailSerializer(serializers.Serializer):
    email_title = serializers.CharField()
    subject = serializers.CharField()
    body = serializers.CharField()
    job_id = serializers.CharField()


class EmailSerializer(serializers.ModelSerializer):
    jobs = JobSerializer(many=True, read_only=True)

    class Meta:
        model = JobApplication
        fields = ['id', 'user', 'jobs', 'profile', 'subject', 'email_title', 'email_name', 'body', 'created_at']


class TestEmailSerializer(serializers.Serializer):
    template_name = serializers.CharField()
    email_title = serializers.CharField()
    email_name = serializers.CharField()
    subject = serializers.CharField()
    body = serializers.CharField()
    email = serializers.EmailField()


class JobApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobApplication
        fields = '__all__'

class JobApplicationGetSerializer(serializers.ModelSerializer):
    job = JobSerializer(many=True, read_only=True)

    class Meta:
        model = JobApplication
        fields = '__all__'

class UserAppliedJobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='job.company.name', allow_null=True)
    job_id = serializers.CharField(source='job.id', allow_null=True)
    logo = serializers.FileField(source='job.company.logo', allow_null=True)
    job_title = serializers.CharField(source='job.title', allow_null=True)
    locations = serializers.CharField(source='job.locations', allow_null=True)
    max_experience = serializers.IntegerField(source='job.max_exp', allow_null=True)
    min_experience = serializers.IntegerField(source='job.min_exp', allow_null=True)
    salary = serializers.CharField(source='job.salary', allow_null=True)
    job_description = serializers.CharField(source='job.description', allow_null=True)

    class Meta:
        model = JobApplication
        fields = ['job_id','company_name', 'logo','job_title', 'locations', 'max_experience', 'min_experience', 'salary', 'job_description']
