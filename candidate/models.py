from django.db import models
from accounts.models import *
from superuser.models import *
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator
from ckeditor.fields import RichTextField
# from company.models import Jobs


class CandidateProfile(models.Model):
    full_name           = models.CharField(_("Full Name"), max_length=150, null=True, blank=True)
    profile_name        = models.CharField(_("Profile Name"), max_length=60,default= "Profile_1",null=True, blank=True)
    created_by          = models.ForeignKey(User, on_delete=models.CASCADE, null=True,blank=True, related_name="cv_profiles")
    type                = models.ForeignKey(SubCategories, on_delete=models.DO_NOTHING, null=True, related_name="resume_sub_category")
    position            = models.CharField(_("CV Position"), max_length=100, null=True, blank=True)

    address             = models.TextField(null=True,blank=True)
    summary             = models.TextField(null=True, blank=True)
    email               = models.CharField(_("Email Address"), max_length=156, null=True, blank=True)

    country_code        = models.CharField(max_length=6, null=True, blank=True,default="+91")
    mobile_no           = models.CharField(max_length=16,validators=[number], null=True, blank=True)

    gender              = models.PositiveIntegerField(choices=GENDER, default=1)
    profile_picture     = models.FileField(null=True, upload_to="profile_pictures/%Y/%m/%d/", blank=True)

    profile_percentage  = models.PositiveIntegerField(default=5,null=True,blank=True)
    template            = models.PositiveIntegerField(default=1,null=True,blank=True)
    is_active           = models.BooleanField(default=True)
    created_at          = models.DateTimeField(auto_now_add=True, null=True)
    updated_at          = models.DateTimeField(auto_now=True, null=True)
    last_notification_time = models.DateTimeField(null=True, blank=True,default=None)
    notification_count = models.IntegerField(default=0,null=True,blank=True)
    web_portfolio       = models.JSONField(default=dict, null=True, blank=True)

    class Meta:
        ordering = ['-id']
    def get_profile_percentage(self):
        percent = { 
            'full_name': 4, 'email': 4, 'mobile_no':4, 'gender':3, 'position':6, 'address':5,
            'profile_picture':4, 'profile_eductaion':6, 'candidate_experience':7,
            'profile_projects':7, 'profile_interest':7, 'profile_skills':5,
            'profile_certifications':4, 'profile_languages':5, 'profile_social':5,
            'profile_video_answer':12,'profile_section_video':12
                    }
        total = 0
        if self.full_name:
            total += percent.get('full_name', 0)
        if self.email:
            total += percent.get('email', 0)
        if self.mobile_no:
            total += percent.get('mobile_no', 0)
        if self.gender:
            total += percent.get('gender', 0)
        if self.address:
            total += percent.get('address', 0)
        if self.profile_picture:
            total += percent.get('profile_picture', 0)
        if self.profile_eductaion.all():
            total += percent.get('profile_eductaion', 0)
        if self.candidate_experience.all():
            total += percent.get('candidate_experience', 0)
        if self.profile_projects.all():
            total += percent.get('profile_projects', 0)
        if self.profile_interest.all():
            total += percent.get('profile_interest', 0)
        if self.profile_skills.all():
            total += percent.get('profile_skills', 0)
        if self.profile_certifications.all():
            total += percent.get('profile_certifications', 0)
        if self.profile_languages.all():
            total += percent.get('profile_languages', 0)
        if self.profile_social.all():
            total += percent.get('profile_social', 0)

        if self.profile_video_answer.all():
            total += percent.get('profile_video_answer', 0)
        if self.profile_section_video.all():
            total += percent.get('profile_section_video', 0)

        self.profile_percentage=total
        return self.profile_percentage


class CandidateEducation(models.Model):
    profile         = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE, related_name="profile_eductaion")
    course          = models.CharField(max_length=300, null=True, blank=True)
    university      = models.CharField(max_length=300, null=True, blank=True)
    start_date      = models.DateField(auto_now_add=False,auto_now = False,blank=True, null=True)
    end_date        = models.DateField(auto_now_add=False,auto_now = False,blank=True, null=True)
    description     = models.TextField(null=True, blank=True,)
    is_current      = models.BooleanField(default=False,)
    is_active       = models.BooleanField(default=True)
    created_at      = models.DateTimeField(auto_now_add=True, null=True)
    updated_at      = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']


class CandidateExperience(models.Model):
    profile                 = models.ForeignKey(CandidateProfile,on_delete=models.CASCADE,related_name="candidate_experience",)
    company_name            = models.CharField(max_length=500, null=True, blank=True)
    type                    = models.PositiveIntegerField(choices=EMPLOYMENT_TYPE, default=1)
    designation             = models.CharField(max_length=500, null=True, blank=True)
    is_current              = models.BooleanField(default=False,)
    start_date              = models.DateField(null=True, blank=True)
    end_date                = models.DateField(null=True, blank=True)
    description             = models.TextField(null=True, blank=True,)
    
    is_active               = models.BooleanField(default=True)
    created_at              = models.DateTimeField(auto_now_add=True, null=True)
    updated_at              = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']
 

class CandidateProjects(models.Model):
    profile             = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE, related_name="profile_projects")
    title               = models.CharField(max_length=200, null=True, blank=True)
    link                = models.CharField(max_length=156, null=True, blank=True)
    technologies        = models.TextField(null=True, blank=True)
    start_date          = models.DateField(null=True, blank=True)
    end_date            = models.DateField(null=True, blank=True)
    description         = models.TextField(null=True, blank=True)
    
    is_active           = models.BooleanField(default=True)
    created_at          = models.DateTimeField(auto_now_add=True, null=True)
    updated_at          = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']


class CandidateInterest(models.Model):
    profile         = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE, null=True, related_name="profile_interest")
    interest        = models.CharField(max_length=250, null=True, blank=True)
    
    is_active       = models.BooleanField(default=True,null=False,blank=False)
    created_at      = models.DateTimeField(auto_now_add=True, null=True)
    updated_at      = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']


class CandidateSkills(models.Model):
    profile           = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE, related_name="profile_skills")
    skill             = models.CharField(max_length=100, null=False, blank=False)
    type              = models.PositiveIntegerField(choices=SKILL_TYPE, default=2)

    is_active         = models.BooleanField(default=True)
    created_at        = models.DateTimeField(auto_now_add=True, null=True)
    updated_at        = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']


class  CandidateCertification(models.Model):
    profile             = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE, null=True, related_name="profile_certifications")
    certificate         = models.CharField(max_length=200, null=True, blank=True)
    
    is_active           = models.BooleanField(default=True)
    created_at          = models.DateTimeField(auto_now_add=True, null=True)
    updated_at          = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']


class CandidateSpokenLanguages(models.Model):
    profile           = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE, null=True, related_name="profile_languages")
    language          = models.CharField(max_length=100)
    can_read          = models.BooleanField(default=False)
    can_write         = models.BooleanField(default=False)
    can_speak         = models.BooleanField(default=False)
    
    is_active         = models.BooleanField(default=True)
    created_at        = models.DateTimeField(auto_now_add=True, null=True)
    updated_at        = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']


class CandidateSocialProfile(models.Model):
    profile         = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE, related_name="profile_social")
    name            = models.CharField(max_length=100, null=True, blank=True)
    link            = models.TextField(null=True, blank=True)

    is_active       = models.BooleanField(default=True)
    created_at      = models.DateTimeField(auto_now_add=True, null=True)
    updated_at      = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']


class VideoQuestion(models.Model):
    question        = models.TextField(null=True, blank=True)
    help_text       = models.TextField(null=True, blank=True)
    video           = models.FileField(null=True, blank=True, upload_to="questions/%Y/%m/%d/")
    category        = models.ForeignKey(Category, on_delete=models.DO_NOTHING, null=True,blank=True, related_name="video_category")
    time_limit      = models.PositiveIntegerField(null=True,blank=True,default=2)

    is_active       = models.BooleanField(default=True)
    created_at      = models.DateTimeField(auto_now_add=True, null=True)
    updated_at      = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']


class VideoAnswer(models.Model):
    profile         = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE,  related_name="profile_video_answer")
    question        = models.ForeignKey(VideoQuestion, on_delete=models.DO_NOTHING, related_name="question_answer")
    video           = models.FileField(null=False, blank=False, upload_to="answers/%Y/%m/%d/")

    is_active       = models.BooleanField(default=True)
    created_at      = models.DateTimeField(auto_now_add=True, null=True)
    updated_at      = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']


class SectionVideo(models.Model):
    profile         = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE,  related_name="profile_section_video")
    section         = models.ForeignKey(Section, on_delete=models.DO_NOTHING,  related_name="section_video")
    video           = models.FileField(null=True, blank=True, upload_to="sections/%Y/%m/%d/")

    is_active       = models.BooleanField(default=True)
    created_at      = models.DateTimeField(auto_now_add=True, null=True)
    updated_at      = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']

class CustomVideo(models.Model):
    profile         = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE,  related_name="profile_custom_video")
    question        = models.TextField(null=True, blank=True)
    video           = models.FileField(null=True, blank=True, upload_to="custom-question-videos/%Y/%m/%d/")

    created_at      = models.DateTimeField(auto_now_add=True, null=True)
    updated_at      = models.DateTimeField(auto_now=True, null=True)
    class Meta:
        ordering = ['-id']






    


# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     applicants = models.ManyToManyField(Jobs, related_name='applicants')
    
#     def __str__(self):
#         return f"Profile for {self.user.username}"