# from django.core.management.base import BaseCommand
# from bs4 import BeautifulSoup
# from company.models import Jobs  # Replace 'yourapp' with the actual name of your Django app

# class Command(BaseCommand):
#     help = 'Add <h1> tags to the "Requirements" section in existing job descriptions.'

#     def handle(self, *args, **options):
#         jobs = Jobs.objects.all()

#         for job in jobs:
#             soup = BeautifulSoup(job.description, 'html.parser')

#             # Find the "Requirements:" section
#             requirements_tag = soup.find(string='Responsibilities:')
#             if requirements_tag:
#                 # Wrap the "Requirements:" section with <h1>
#                 requirements_tag.wrap(soup.new_tag('h1'))

#             job.description = str(soup)
#             job.save()

#         self.stdout.write(self.style.SUCCESS('Successfully added <h1> tags to the "Responsibilities" section in job descriptions.'))

from django.core.management.base import BaseCommand
from bs4 import BeautifulSoup
from company.models import Jobs  

class Command(BaseCommand):
    help = 'Add <h2> tags to the "Requirements" section in existing job descriptions.'

    def handle(self, *args, **options):
        jobs = Jobs.objects.all()

        for job in jobs:
            soup = BeautifulSoup(job.description, 'html.parser')

            # Find the first <p> tag
            p_tag = soup.find('p')

            # Check if there is a <p> tag and if its text doesn't contain "Responsibilities" or "Requirements"
            if p_tag and "Responsibilities" not in p_tag.get_text() and "Requirements" not in p_tag.get_text():
                # Convert the <p> tag to <h2>
                h2_tag = soup.new_tag('h2')
                h2_tag.string = p_tag.get_text()
                p_tag.replace_with(h2_tag)

                # Update the job description in the database
                job.description = str(soup)
                job.save()

        self.stdout.write(self.style.SUCCESS('Successfully updated job descriptions.'))
