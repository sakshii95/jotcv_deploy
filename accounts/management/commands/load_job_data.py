import json
import requests
from django.core.management.base import BaseCommand
from django.core.exceptions import ValidationError
from company.models import Skill, JobCategory, Company, Job
from django.core.files.base import ContentFile

class Command(BaseCommand):
    help = 'Load job data from a JSON file stored at a given API endpoint'

    def handle(self, *args, **kwargs):
        api_url = 'https://api.jotcv.com/static/new_111.json'

        try:
            response = requests.get(api_url)
            response.raise_for_status()
            json_data = response.json()
        except requests.exceptions.RequestException as e:
            self.stdout.write(self.style.ERROR(f"Error fetching data from {api_url}: {e}"))
            return

        for entry in json_data:

            keywords_data = entry.get("skills", [])
            keywords = [Skill.objects.get_or_create(name=keyword)[0] for keyword in keywords_data]

            details = entry.get("description", "")

            job_category_data = entry.get("category", "")

            if job_category_data:
                job_category, _ = JobCategory.objects.get_or_create(name=job_category_data)
            else:
                # Set a default category or skip this part based on your requirement
                job_category = None

            company_name = entry.get("company", "")
            company, _ = Company.objects.get_or_create(
                name=company_name,
                defaults={
                    "tagline": entry.get("company_tagline", ""),
                    "founded": entry.get("company_founded", None),
                    "employee_count": entry.get("employee_count", None),
                    "note": entry.get("instahyre_note", None),
                }
            )

            # Save company logo
            logo_url = entry.get("company_logo", "")
            if logo_url:
                logo_image_content = requests.get(logo_url).content
                logo_name = f"{company_name}_logo.jpg"
                company.logo.save(logo_name, ContentFile(logo_image_content), save=True)

  
            # Create Job instance
            job = Job(
                title=entry.get("title", ""),
                locations=entry.get("location", ""),
                description=details,
                min_exp=entry.get("min_exp", None),
                max_exp=entry.get("max_exp", None),
                job_function=entry.get("functional_area", ""),
                job_category=job_category,
                company=company,
            )

            job.save()
            job.skills.set(keywords)
        

        self.stdout.write(self.style.SUCCESS("Data insertion completed."))


# yourapp/management/commands/load_job_data.py

# import json
# import requests
# from django.core.management.base import BaseCommand
# from company.models import Keyword

# class Command(BaseCommand):
#     help = 'Load job data from a JSON file stored at a given API endpoint'

#     def handle(self, *args, **kwargs):
#         # API endpoint where the JSON data is stored
#         api_url = 'https://api.jotcv.com/static/jobs.json'

#         try:
#             response = requests.get(api_url)
#             response.raise_for_status()
#             data = response.json()
#         except requests.exceptions.RequestException as e:
#             self.stderr.write(self.style.ERROR(f'Error fetching data from API: {e}'))
#             return

#         self.stdout.write(self.style.SUCCESS('Data fetched successfully!'))

#         # Iterate through the data and create model instances
#         for item in data:
#             job_objects = item.get("objects", [])
#             for job_data in job_objects:
#                 # Save keywords to the Keyword model
#                 if job_data.get("keywords"):
#                     for keyword_name in job_data["keywords"]:
#                         keyword, created = Keyword.objects.get_or_create(name=keyword_name)

#         self.stdout.write(self.style.SUCCESS('Keywords loaded successfully!'))
