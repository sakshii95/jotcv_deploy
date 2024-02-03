from rest_framework.serializers import ModelSerializer, ValidationError,SerializerMethodField, ReadOnlyField
from .models import *
from superuser.models  import *
from superuser.serializer  import *
from rest_framework import serializers
from company.serializer import *
# from resumes.models import ResumeTemplate
# from resumes.serializer import TemplateSerializer


class AllProfileListSerializer(ModelSerializer):
    profile_percentage       = SerializerMethodField("get_profile_percentage", read_only=True)
    class Meta:
        model = CandidateProfile
        fields = ("id","profile_picture","full_name","profile_name","web_portfolio","position","profile_percentage","template","created_at","updated_at")

    def get_profile_percentage(self, profile):
        try:
            profile.get_profile_percentage()
            return profile.profile_percentage
        except:
            return None

class CandidateProfileSerializer(ModelSerializer):
    profile_percentage       = SerializerMethodField("get_profile_percentage", read_only=True)
    class Meta:
        model = CandidateProfile
        fields = "__all__"
    def get_profile_percentage(self, profile):
        try:
            percentage = profile.get_profile_percentage()
            return profile.profile_percentage
        except:
            return None
        
class WebPortfolioUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CandidateProfile
        fields = ['web_portfolio']

    def update(self, instance, validated_data):
        instance.web_portfolio = validated_data.get('web_portfolio', instance.web_portfolio)
        instance.save()
        return instance
    
class CreateCandidateProfileSerializer(ModelSerializer):
    profile_percentage       = SerializerMethodField("get_profile_percentage", read_only=True)
    class Meta:
        model = CandidateProfile
        exclude = ('created_at','updated_at','is_active')
    def get_profile_percentage(self, profile):
        try:
            profile.get_profile_percentage()
            return profile.profile_percentage
        except:
            return None
    def validate(self, data):
        """
        Check that the start is before the stop.
        """
        if self.context['request'].method in ['POST']:
            if not data.get("is_active"):
                data["is_active"] = True
        return data

    def create(self, validated_data):
        request = self.context["request"]
        instance = CandidateProfile.objects.create(**validated_data)
        instance.created_by_id = request.user.id
        instance.is_active = True
        instance.save()
        return instance
    
      
'''
Education section
'''
class CandidateEducationSerializer(ModelSerializer):
    class Meta:
        model = CandidateEducation
        exclude = ('created_at','updated_at','is_active')


class UpdateCandidateEducationSerializer(ModelSerializer):
    class Meta:
        model = CandidateEducation
        exclude = ('created_at','updated_at','is_active')
    def validate(self, data):
        if self.context['request'].method in ['POST']:
            if not data.get('course') and not data.get('university'):
                raise ValidationError({"message": "You must enter company_name"})
        return data


'''
previous work experience
'''
class CandidateExperienceSerializer(ModelSerializer):
    class Meta:
        model = CandidateExperience
        exclude = ('created_at','updated_at','is_active')

'''
Projects
'''
class CandidateProjectsSerializer(ModelSerializer):
    class Meta:
        model = CandidateProjects
        exclude = ('created_at','updated_at','is_active')
    def validate(self, data):
        if self.context['request'].method in ['POST']:
            if not data.get('title'):
                raise ValidationError({"message": "You must enter title"})
            if not data.get("is_active"):
                data["is_active"] = True
        return data


'''
interests
'''
class CandidateInterestSerializer(ModelSerializer):
    class Meta:
        model = CandidateInterest
        exclude = ('created_at','updated_at','is_active')
    def validate(self, data):
        if self.context['request'].method in ['POST']:
            if not data["is_active"]:
                data["is_active"] = True
        return data


'''
skills
''' 
class CandidateSkillsSerializer(ModelSerializer):
    class Meta:
        model = CandidateSkills
        exclude = ('created_at','updated_at','is_active')
    def validate(self, data):
        if self.context['request'].method in ['POST']:
            if not data["is_active"]:
                data["is_active"] = True
        return data


'''
certification
'''
class CandidateCertificationSerializer(ModelSerializer):
    class Meta:
        model = CandidateCertification
        exclude = ('created_at','updated_at','is_active')
    def validate(self, data):
        if self.context['request'].method in ['POST']:
            if not data["is_active"]:
                data["is_active"] = True
        return data
    

'''
spoken languages
'''     
class CandidateSpokenLanguagesSerializer(ModelSerializer):
    class Meta:
        model = CandidateSpokenLanguages
        exclude = ('created_at','updated_at','is_active')
    def validate(self, data):
        if self.context['request'].method in ['POST']:
            if not data["is_active"]:
                data["is_active"] = True
        return data
    
'''
spoken languages
'''     
class CandidateSocialSerializer(ModelSerializer):
    class Meta:
        model = CandidateSocialProfile
        exclude = ('created_at','updated_at','is_active')
    def validate(self, data):
        if self.context['request'].method in ['POST']:
            if not data["is_active"]:
                data["is_active"] = True
        return data
'''
Videos Section
'''

'''
videos
'''     
class VideoQuestionSerializer(ModelSerializer):
    category        = CategorySerializer(read_only=True)
    answer_details  = SerializerMethodField(read_only = True)

    class Meta:
        model = VideoQuestion
        exclude = ('created_at','updated_at','is_active' )

    def get_answer_details(self,question):
        profile_id = self.context.get("profile_id")
        data = {}
        try:
            try:
                answer_obj = VideoAnswer.objects.get(
                    profile_id   = profile_id,
                    question    = question
                    )
            except:
                answer_obj = VideoAnswer.objects.create(
                    profile_id   = profile_id,
                    question = question
                    )
            data["answer_id"]=answer_obj.id
            if answer_obj.video:
                data["video"] = answer_obj.video.url
                return data
            data["video"] = None
            return data
        except:
            return None


class VideoAnswerSerializer(ModelSerializer):
    question = VideoQuestionSerializer(read_only=True)
    class Meta:
        model = VideoAnswer
        fields = "__all__"
    

class UpdateVideoAnswerSerializer(ModelSerializer):
    class Meta:
        model = VideoAnswer
        fields = "__all__"
    def validate(self, data):
        request = self.context.get("request")
        if self.context['request'].method in ['POST']:
            if not request.FILES.get("video") or not data.get('question'):
                raise ValidationError({"video": "You must enter video and question"})
            if not data["is_active"]:
                data["is_active"] = True
        return data

class SectionSerializer(ModelSerializer):
    class Meta:
        model = Section
        exclude = ('created_at','updated_at','is_active' )

class SectionVideoSerializer(ModelSerializer):
    section = SectionSerializer(read_only=True)

    class Meta:
        model = SectionVideo
        fields = "__all__"

class UpdateSectionVideoSerializer(ModelSerializer):
    class Meta:
        model = SectionVideo
        fields = "__all__"
    def validate(self, data):
        request = self.context.get("request")
        if self.context['request'].method in ['POST']:
            if not request.FILES.get("video"):
                raise ValidationError({"video": "You must enter video and question"})
            if not data["is_active"]:
                data["is_active"] = True
        return data

class CustomVideoSerializer(ModelSerializer):
    class Meta:
        model = CustomVideo
        exclude = ('created_at','updated_at',)


''' Full Profile API'''
class CandidateProfileFullDetailsSerializer(ModelSerializer):
    eductaions          = SerializerMethodField("get_eductaions", read_only=True)
    experiences         = SerializerMethodField("get_experiences", read_only=True)
    projects            = SerializerMethodField("get_projects", read_only=True)
    interests           = SerializerMethodField("get_interests", read_only=True)
    skills              = SerializerMethodField("get_skills", read_only=True)
    certification       = SerializerMethodField("get_certification", read_only=True)
    languages           = SerializerMethodField("get_languages", read_only=True)
    social_links        = SerializerMethodField("get_links", read_only=True)
    profile_percentage  = SerializerMethodField("get_profile_percentage", read_only=True)
    video_questions     = SerializerMethodField("get_video_questions", read_only=True)
    custom_videos       = SerializerMethodField("get_custom_videos", read_only=True)

    class Meta:
        model = CandidateProfile
        exclude = ('created_at','updated_at','is_active')
    def get_profile_percentage(self, profile):
        try:
            profile.get_profile_percentage()
            return profile.profile_percentage
        except:
            return None
    def get_eductaions(self, profile):
        try:
            educations = profile.profile_eductaion.all()
            data = CandidateEducationSerializer(educations,many=True).data
            return data
        except:
            return None
    def get_experiences(self, profile):
        try:
            experiences = profile.candidate_experience.all()
            data = CandidateExperienceSerializer(experiences,many=True).data
            return data
        except:
            return None
    def get_projects(self, profile):
        try:
            experiences = profile.profile_projects.all()
            data = CandidateProjectsSerializer(experiences,many=True).data
            return data
        except:
            return None
    def get_interests(self, profile):
        try:
            interests = profile.profile_interest.all()
            data = CandidateInterestSerializer(interests,many=True).data
            return data
        except:
            return None
    def get_skills(self, profile):
        try:
            skills = profile.profile_skills.all()
            data = CandidateSkillsSerializer(skills,many=True).data
            return data
        except:
            return None

    def get_certification(self, profile):
        try:
            certificates = profile.profile_certifications.all()
            data = CandidateCertificationSerializer(certificates,many=True).data
            return data
        except:
            return None
        
    def get_languages(self, profile):
        try:
            languages = profile.profile_languages.all()
            data = CandidateSpokenLanguagesSerializer(languages,many=True).data
            return data
        except:
            return None
    def get_links(self, profile):
        try:
            links = profile.profile_social.all()
            data = CandidateSocialSerializer(links,many=True).data
            return data
        except:
            return None
        
    def get_video_questions(self, profile):
        try:
            videos = profile.profile_video_answer.all()
            data = VideoAnswerSerializer(videos,many=True).data
            return data
        except:
            return None
        
    def get_custom_videos(self, profile):
        try:
            videos = profile.profile_custom_video.all()
            data = CustomVideoSerializer(videos,many=True).data
            return data
        except:
            return None


class CandidateProfileNameSerializer(ModelSerializer):
    class Meta:
        model = CandidateProfile
        fields = ("id","profile_picture","full_name","profile_name","position","profile_percentage","template","created_at","updated_at")

class TestEmailSerializer(serializers.Serializer):
    template_name = serializers.CharField()
    email_title = serializers.CharField()
    email_name = serializers.CharField()
    subject = serializers.CharField()
    body = serializers.CharField()
    email = serializers.EmailField()

class EmailSerializer(serializers.Serializer):
    email_title = serializers.CharField()
    subject = serializers.CharField()
    body = serializers.CharField()
    hr_email = serializers.EmailField()
    job_id = serializers.CharField()



# class InvitationDetailSerializer(serializers.ModelSerializer):
#     user_email = serializers.EmailField(source='user.email', read_only=True)
#     company_name = serializers.SerializerMethodField(read_only=True)
#     hr_email = serializers.SerializerMethodField(read_only=True)
#     # job_details = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = InvitationHr
#         fields = ('id', 'user_email', 'hr_email', 'subject', 'body', 'created_at', 'company_name')

#     def get_company_name(self, obj):
#         company = obj.companies.first()
#         return company.name if company else None

#     def get_hr_email(self, obj):
#         company = obj.companies.first()
#         return company.hr_contact_email if company else None

    # def get_job_details(self, obj):
    #     company = obj.companies.first()
    #     if company:
    #         job = company.jobs.first()
    #         if job:
    #             return JobSerializer(job).data
    #     return None




# class UserProfileSerializer(serializers.ModelSerializer):
#     applicants = JobSerializer(many=True, read_only=True)

#     class Meta:
#         model = UserProfile
#         fields = ('user', 'applicants')
