import os
from openai import OpenAI
from django.conf import settings
import random


api_keys = [settings.OPENAI_API_KEY_1, settings.OPENAI_API_KEY_2]
selected_api_key = random.choice(api_keys)
client = OpenAI(api_key = selected_api_key)

class GPT3Client:
    def create_response(self, prompt):
        messages = [{"role": "user", "content": prompt}]
        
        try:
            chat = client.chat.completions.create(
                model="gpt-3.5-turbo", messages=messages
            )
            reply = chat.choices[0].message.content
            return reply
        except Exception as e:
            print(f"Error: {e}")
            return "An error occurred while processing the request."
