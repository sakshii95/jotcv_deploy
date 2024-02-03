import logging
from .models import *
from api.tasks import send_application_email,send_test_email
from .serializers import *
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from wallet.models import UserSubscription
from rest_framework import generics
# from accounts.fcm_noti import *
# from fcm_django.models import FCMDevice

db_logger = logging.getLogger('db') 
 
 
class AllProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        data = {}
        we_data = {}
        try:
            user = request.user
            profile = CandidateProfile.objects.filter(created_by=request.user)
            data = AllProfileListSerializer(profile,many=True).data
            total_profiles = profile.count()

            subscription = UserSubscription.objects.filter(user=user, is_active=True).first()
            subscription_data = {
                "subscription": subscription.subscription.title if subscription else None
            }
            we_data = user.web_portfolio
        except Exception as e:
            db_logger.exception(e)
        return Response({"data":data,"web-portfolio":we_data,"total_profiles_count": total_profiles,
                         "subscription": subscription_data,"status":status.HTTP_200_OK},status.HTTP_200_OK)


class ProfileFullDetailsAPI(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request,pk, format=None):
        try:
            user = request.user
            profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            data = CandidateProfileFullDetailsSerializer(profile).data
            subscription = UserSubscription.objects.filter(user=user, is_active=True).first()
            subscription_data = {
                "subscription": subscription.subscription.title if subscription else None
            }
            return Response({"data":data,"subscription": subscription_data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

class ProfileWebPortfolioAPI(APIView):
    def get(self, request,pk, format=None):
        try:
            user = User.objects.get(id=pk)
            try:
                primary_id = user.web_portfolio["primary_id"]
            except:
                user.web_portfolio["primary_id"] =1
            try:
                profile_id = user.web_portfolio["profile_id"]
                profile = CandidateProfile.objects.get(id=profile_id)
            except:
                profile= CandidateProfile.objects.filter(created_by=user)
                if profile.count() == 0:
                    return Response({"message":"Create profile first","status":status.HTTP_403_FORBIDDEN},status.HTTP_403_FORBIDDEN)
                profile = profile.first()
                user.web_portfolio["profile_id"]=profile.id
            user.save()
            data = CandidateProfileFullDetailsSerializer(profile).data
            data["web_portfolio"] = user.web_portfolio
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except Exception as e:
            db_logger.exception(e)
            return Response({"message":"Pofile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)


class ProfileAPI(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request,pk, format=None):
        try:

            profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            data = CandidateProfileSerializer(profile).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        try:
            profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            serializer = CandidateProfileSerializer(profile,data=request.data,partial=True,context={"request":request})
            if serializer.is_valid():
                serializer.save()
                return Response({"data":serializer.data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
            return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        if not request.data.get("position") or not request.data.get("full_name") or not request.data.get("email"):
                return Response({"message":"Enter position, full name and email","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
        
        serializer = CreateCandidateProfileSerializer(data=request.data,context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response({"data":serializer.data,"status":status.HTTP_201_CREATED},status.HTTP_201_CREATED)
        return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            candidate_profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            candidate_profile.delete()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)



class ProfileNameAPI(APIView):
    def patch(self, request, profile_id):
        try:
            profile = CandidateProfile.objects.get(pk=profile_id)
        except CandidateProfile.DoesNotExist:
            return Response({"detail": "CandidateProfile not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = CandidateProfileNameSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''
Education Section
'''
class CandidateAllEducationAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk, format=None):
        try:
            try:
                profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            except:
                return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

            education = CandidateEducation.objects.filter(profile__id= profile.id)
            data = CandidateEducationSerializer(education,many=True,context={"request":request}).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

class WebProfileAPI(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = request.user
        data = {}

        try:
            web_portfolio_data = request.data.get("web_portfolio")
            primary_id = web_portfolio_data.get("primary_id")
            profile_id = web_portfolio_data.get("profile_id")
            # user.web_portfolio = request.data.get("web_portfolio")
            # user.save()
            # data = user.web_portfolio
            user.web_portfolio = request.data.get("web_portfolio")
            user.save()
            data = UserSerializer(user).data
            if primary_id and profile_id:
                candidate_profile = CandidateProfile.objects.get(id=profile_id, created_by=user)
                serializer = WebPortfolioUpdateSerializer(candidate_profile, data={'web_portfolio': web_portfolio_data}, partial=True)
                
                if serializer.is_valid():
                    serializer.save()
                    data['web_portfolio'] = web_portfolio_data
                else:
                    data['errors'] = serializer.errors

            else:
                data['error'] = "Both 'primary_id' and 'profile_id' are required inside 'web_portfolio'."

        except CandidateProfile.DoesNotExist:
            data['error'] = f"Candidate profile with ID {primary_id} and profile ID {profile_id} does not exist."

        except Exception as e:
            data['error'] = str(e)

        return Response({"data": data, "status": status.HTTP_200_OK}, status.HTTP_200_OK)

    def get(self, request):
        user = request.user
        data = {}
        try:
            data = user.web_portfolio
        except:
            pass
        return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)


class CandidateEducationAPI(APIView):
    permission_classes = [IsAuthenticated]
    def check_current(self, request):
        # request.data._mutable = True
        if request.data.get("is_current"):
            request.data.update({"is_current": True, "is_active": True,"end_date":None})
        else:
            request.data.update({"is_current": False, "is_active": True})

    def get(self, request,pk, format=None):
        try:
            profile = CandidateEducation.objects.get(profile__created_by=request.user,id=pk)
            data = CandidateEducationSerializer(profile).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        try:
            profile = CandidateEducation.objects.get(profile__created_by=request.user,id=pk)
            self.check_current(request)
            serializer = UpdateCandidateEducationSerializer(profile,data=request.data,partial=True,context={"request":request})
            if serializer.is_valid():
                serializer.save()
                return Response({"data":serializer.data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
            return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message":"Invalid ID/Data not found","error":str(e),"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        try:
            profile = CandidateProfile.objects.get(created_by=request.user,id=request.data.get("profile"))
        except:
            return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
        self.check_current(request)

        serializer = UpdateCandidateEducationSerializer(data=request.data,context={"request":request})
        if serializer.is_valid():

            serializer.save()
            return Response({"data":serializer.data,"status":status.HTTP_201_CREATED},status.HTTP_201_CREATED)
        return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            candidate_profile = CandidateEducation.objects.get(profile__created_by=request.user,id=pk)
            candidate_profile.delete()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)



'''
experience
'''
class CandidateAllExperiencesAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk, format=None):
        try:
            try:
                profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            except:
                return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

            experiences = CandidateExperience.objects.filter(profile__id= profile.id)
            data = CandidateExperienceSerializer(experiences,many=True,context={"request":request}).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

class CandidateExperienceAPI(APIView):
    permission_classes = [IsAuthenticated]
    def check_current(self, request):
        # request.data._mutable = True
        if request.data.get("is_current"):
            request.data.update({"is_current": True, "is_active": True,"end_date":None})
        else:
            request.data.update({"is_current": False, "is_active": True})

    def get(self, request,pk, format=None):
        try:
            profile = CandidateExperience.objects.get(profile__created_by=request.user,id=pk)
            data = CandidateExperienceSerializer(profile).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        try:
            profile = CandidateExperience.objects.get(profile__created_by=request.user,id=pk)
            self.check_current(request)
            serializer = CandidateExperienceSerializer(profile,data=request.data,partial=True,context={"request":request})
            if serializer.is_valid():
                serializer.save()
                return Response({"data":serializer.data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
            return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        self.check_current(request)
        serializer = CandidateExperienceSerializer(data=request.data,context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response({"data":serializer.data,"status":status.HTTP_201_CREATED},status.HTTP_201_CREATED)
        return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            candidate_profile = CandidateExperience.objects.get(profile__created_by=request.user,id=pk)
            candidate_profile.delete()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)



'''
projects
'''
class CandidateAllProjectsAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk, format=None):
        try:
            try:
                profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            except:
                return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

            experiences = CandidateProjects.objects.filter(profile__id= profile.id)
            data = CandidateProjectsSerializer(experiences,many=True,context={"request":request}).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

class CandidateProjectsAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk, format=None):
        try:
            profile = CandidateProjects.objects.get(profile__created_by=request.user,id=pk)
            data = CandidateProjectsSerializer(profile).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        try:
            profile = CandidateProjects.objects.get(profile__created_by=request.user,id=pk)
            serializer = CandidateProjectsSerializer(profile,data=request.data,partial=True,context={"request":request})
            if serializer.is_valid():
                serializer.save()
                return Response({"data":serializer.data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
            return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        serializer = CandidateProjectsSerializer(data=request.data,context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response({"data":serializer.data,"status":status.HTTP_201_CREATED},status.HTTP_201_CREATED)
        return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            candidate_profile = CandidateProjects.objects.get(profile__created_by=request.user,id=pk)
            candidate_profile.delete()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)


'''
intrest
'''

class CandidateInterestAPI(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request,pk, format=None):
        try:
            try:
                profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            except:
                return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

            social = CandidateInterest.objects.filter(profile__id= profile.id)
            data = CandidateInterestSerializer(social,many=True,context={"request":request}).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        try:
            profile = CandidateProfile.objects.get(created_by=request.user,id=request.data.get("profile"))
        except:
            return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

        total_interests = request.data.get("total_interests")
        if not total_interests:
            return Response({"message":"Enter total interests","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

        for i in range(1,int(total_interests)+1):
            if request.data.get(f'interest{i}') and not profile.profile_interest.filter(interest__iexact=request.data.get(f'interest{i}')):
                CandidateInterest.objects.create(profile= profile,interest=request.data.get(f'interest{i}'))
        interests = profile.profile_interest.all()
        data = CandidateInterestSerializer(interests,many=True).data
        return Response({"data":data,"message":"Interests created successfully","status":status.HTTP_201_CREATED},status.HTTP_201_CREATED)

    def delete(self, request, pk, format=None):
        try:
            candidate_profile = CandidateInterest.objects.get(profile__created_by=request.user,id=pk)
            candidate_profile.delete()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)



'''
candidate skills
'''
class CandidateSkillsAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk, format=None):
        try:
            try:
                profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            except:
                return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

            skills = CandidateSkills.objects.filter(profile__id= profile.id)
            data = CandidateSkillsSerializer(skills,many=True,context={"request":request}).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        try:
            profile = CandidateProfile.objects.get(created_by=request.user,id=request.data.get("profile"))
        except:
            return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

        total_skills = request.data.get("total_skills")
        if not total_skills:
            return Response({"message":"enter total skills","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

        for i in range(1,int(total_skills)+1):
            if request.data.get(f'skill{i}') and request.data.get(f'type{i}') and not profile.profile_skills.filter(skill__iexact=request.data.get(f'skill{i}')):
                CandidateSkills.objects.create(profile= profile,skill=request.data.get(f'skill{i}'),type=request.data.get(f'type{i}'))
        skills = profile.profile_skills.all()
        data = CandidateSkillsSerializer(skills,many=True).data
        return Response({"data":data,"message":"Skills created successfully","status":status.HTTP_201_CREATED},status.HTTP_201_CREATED)

    def delete(self, request, pk, format=None):
        try:
            candidate_profile = CandidateSkills.objects.get(profile__created_by=request.user,id=pk)
            candidate_profile.delete()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)


'''
certification
'''
class CandidateCertificationAPI(APIView):
    permission_classes = [IsAuthenticated,]
    def get(self, request,pk, format=None):
        try:
            try:
                profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            except:
                return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

            social = CandidateCertification.objects.filter(profile__id= profile.id)
            data = CandidateCertificationSerializer(social,many=True,context={"request":request}).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        try:
            profile = CandidateProfile.objects.get(created_by=request.user,id=request.data.get("profile"))
        except:
            return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

        total_certificates = request.data.get("total_certificates")
        if not total_certificates:
            return Response({"message":"Enter total certificaions","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

        for i in range(1,int(total_certificates)+1):
            if request.data.get(f'certificate{i}') and not profile.profile_certifications.filter(certificate__iexact=request.data.get(f'certificate{i}')):
                CandidateCertification.objects.create(profile= profile, certificate=request.data.get(f'certificate{i}'))
        interests = profile.profile_certifications.all()
        data = CandidateCertificationSerializer(interests,many=True).data
        return Response({"data":data,"message":"Certificaions created successfully","status":status.HTTP_201_CREATED},status.HTTP_201_CREATED)

    def delete(self, request, pk, format=None):
        try:
            candidate_certificate = CandidateCertification.objects.get(profile__created_by=request.user,id=pk)
            candidate_certificate.delete()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)


'''
candidate skills
'''
class CandidateLanguagesAPI(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request,pk, format=None):
        try:
            try:
                profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            except:
                return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

            languages = CandidateSpokenLanguages.objects.filter(profile__id= profile.id)
            data = CandidateSpokenLanguagesSerializer(languages,many=True,context={"request":request}).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        try:
            profile = CandidateProfile.objects.get(created_by=request.user,id=request.data.get("profile"))
        except:
            return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

        total_languages = request.data.get("total_languages")
        if not total_languages:
            return Response({"message":"Enter total languages","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

        for i in range(1,int(total_languages)+1):
            if request.data.get(f'language{i}'):
                if request.data.get(f'language{i}').get("name") and not profile.profile_languages.filter(language__iexact=request.data.get(f'language{i}').get("name")):
                    try:
                        CandidateSpokenLanguages.objects.create(profile= profile,language=request.data.get(f'language{i}').get("name") ,
                                                            can_read=request.data.get(f'language{i}').get("can_read"),
                                                            can_write=request.data.get(f'language{i}').get("can_write"),
                                                            can_speak=request.data.get(f'language{i}').get("can_speak")
                                                            )
                    except:
                        pass
        languages = profile.profile_languages.all()
        data = CandidateSpokenLanguagesSerializer(languages,many=True).data
        return Response({"data":data,"message":"Languages created successfully","status":status.HTTP_201_CREATED},status.HTTP_201_CREATED)

    def delete(self, request, pk, format=None):
        try:
            candidate_profile = CandidateSpokenLanguages.objects.get(profile__created_by=request.user,id=pk)
            candidate_profile.delete()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)



'''
candidate social links
'''
class CandidateSocialAPI(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request,pk, format=None):
        try:
            try:
                profile = CandidateProfile.objects.get(created_by=request.user,id=pk)
            except:
                return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

            social_links = CandidateSocialProfile.objects.filter(profile__id= profile.id)
            data = CandidateSocialSerializer(social_links,many=True,context={"request":request}).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        try:
            profile = CandidateProfile.objects.get(created_by=request.user,id=request.data.get("profile"))
        except:
            return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

        total_links = request.data.get("total_links")
        if not total_links:
            return Response({"message":"Enter total links","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

        for i in range(1,int(total_links)+1):
            if request.data.get(f'social{i}'):
                if request.data.get(f'social{i}').get("name") and not profile.profile_social.filter(name__iexact=request.data.get(f'social{i}').get("name")):
                    try:
                        CandidateSocialProfile.objects.create(profile= profile,
                                                              name=request.data.get(f'social{i}').get("name") ,
                                                                link=request.data.get(f'social{i}').get("link"),
                                                        )
                    except:
                        pass
        links = profile.profile_social.all()
        data = CandidateSocialSerializer(links,many=True).data
        return Response({"data":data,"message":"Social Links added successfully","status":status.HTTP_201_CREATED},status.HTTP_201_CREATED)

    def delete(self, request, pk, format=None):
        try:
            social_link = CandidateSocialProfile.objects.get(profile__created_by=request.user,id=pk)
            social_link.delete()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)


'''Videos Section API's'''
class QuestionVideosListAPI(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        try:
            questions = VideoQuestion.objects.filter()
            profile_id = request.query_params.get("profile_id")
            context = {
                    "profile_id":profile_id,
                }
            data = VideoQuestionSerializer(questions,many=True,context=context)
            return Response({"data":data.data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)


class VideosAnswersListAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk, format=None):
        try:
            video_answer = VideoAnswer.objects.filter(profile__created_by=request.user,profile_id=pk)
            data = VideoAnswerSerializer(video_answer,many=True).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"No data found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)


class VideosAnswersAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk, format=None):
        try:
            video_answer = VideoAnswer.objects.get(profile__created_by=request.user,id=pk)
            data = VideoAnswerSerializer(video_answer).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except Exception as e:
            db_logger.exception(f"internal server error {request.user}")

            db_logger.exception(e)
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        try:
            video_answer = VideoAnswer.objects.get(profile__created_by=request.user,id=pk)
            serializer = UpdateVideoAnswerSerializer(video_answer,data=request.data,partial=True,context={"request":request})
            if serializer.is_valid():
                serializer.save()
                videos = video_answer.profile.profile_video_answer.all()
                data = VideoAnswerSerializer(videos,many=True).data
                return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)

            return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None):
        try:
            video_answer = VideoAnswer.objects.get(profile__created_by=request.user,id=pk)
            video_answer.video=None
            video_answer.save()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except Exception as e:
            db_logger.exception(f"internal server error {request.user}")

            db_logger.exception(e)
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)



class SectionsAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        categories = Section.objects.filter(is_active=True,)
        data = SectionSerializer(categories,many=True).data
        return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
    

class SectionVideosAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk, format=None):
        try:
            video_answer = SectionVideo.objects.get(profile__created_by=request.user,id=pk)
            data = SectionVideoSerializer(video_answer).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        try:
            video_answer = SectionVideo.objects.get(profile__created_by=request.user,id=pk)
            serializer = UpdateSectionVideoSerializer(video_answer,data=request.data,partial=True,context={"request":request})
            if serializer.is_valid():
                serializer.save()
                return Response({"data":serializer.data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
            return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        serializer = UpdateSectionVideoSerializer(data=request.data,context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response({"data":serializer.data,"status":status.HTTP_201_CREATED},status.HTTP_201_CREATED)
        return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            video_answer = SectionVideo.objects.get(profile__created_by=request.user,id=pk)
            video_answer.delete()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)



class CustomVideosAPI(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request,pk, format=None):
        try:
            video_answer = CustomVideo.objects.get(profile__created_by=request.user,id=pk)
            data = CustomVideoSerializer(video_answer).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        try:
            video_answer = CustomVideo.objects.get(profile__created_by=request.user,id=pk)
            serializer = CustomVideoSerializer(video_answer,data=request.data,partial=True,context={"request":request})
            if serializer.is_valid():
                serializer.save()
                return Response({"data":serializer.data,"status":status.HTTP_200_OK},status.HTTP_200_OK)
            return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"message":"Invalid ID/Data not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        try:
            profile = CandidateProfile.objects.get(created_by=request.user,id=request.data.get("profile"))
        except:
            return Response({"message":"Profile not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

        serializer = CustomVideoSerializer(data=request.data,context={"request":request})
        if serializer.is_valid():
            serializer.save()
            videos = profile.profile_custom_video.all()
            data = CustomVideoSerializer(videos,many=True).data
            return Response({"data":data,"status":status.HTTP_200_OK},status.HTTP_200_OK)

        return Response({"message":serializer.errors,"status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        try:
            video_answer = CustomVideo.objects.get(profile__created_by=request.user,id=pk)
            video_answer.delete()
            return Response({"message":"Deleted successfully","status":status.HTTP_200_OK},status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong/Not found","status":status.HTTP_400_BAD_REQUEST},status.HTTP_400_BAD_REQUEST)

