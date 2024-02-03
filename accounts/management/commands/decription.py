
from django.core.management.base import BaseCommand
from company.models import Job

class Command(BaseCommand):
    help = 'Update custom_description for existing Job records'

    def handle(self, *args, **kwargs):
        jobs = Job.objects.all()

        for job in jobs:
            job.custom_description = f"We have a requirement for {job.title} having knowledge of below {', '.join(job.keywords)}."
            job.save()

        self.stdout.write(self.style.SUCCESS('Custom descriptions updated successfully!'))
