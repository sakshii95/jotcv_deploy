from rest_framework.serializers import ModelSerializer
from .models import *



class PrompSerializer(ModelSerializer):
    class Meta:
        model = Prompt
        fields = ('id','prompt_text' )

