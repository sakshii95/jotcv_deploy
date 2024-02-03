import logging
from .models import *
from rest_framework import status
from .openai_utils import GPT3Client
from .serializer import PrompSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

db_logger = logging.getLogger('db') 
 

class PromptsAPI(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Prompt.objects.all()
    serializer_class = PrompSerializer

class PromptDetailAPI(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Prompt.objects.all()
    serializer_class = PrompSerializer

    
 
class CreatePromptResponseAPI(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, prompt_id):
        try:
            prompt = Prompt.objects.get(id=prompt_id)
            gpt3_client = GPT3Client()
            response = gpt3_client.create_response(prompt.prompt_text)
            return Response({"data": response, "status": status.HTTP_200_OK}, status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e), "status": status.HTTP_400_BAD_REQUEST}, status.HTTP_400_BAD_REQUEST)
 