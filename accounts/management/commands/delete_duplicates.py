from django.core.management.base import BaseCommand
from django.db.models import Count, Min
from company.models import Jobs

class Command(BaseCommand):
    help = 'Delete duplicate rows based on the resource_uri field'

    def handle(self, *args, **options):
        duplicate_rows = (
            Jobs.objects
            .values('resource_uri')
            .annotate(row_count=Count('resource_uri'))
            .filter(row_count__gt=1)
        )

        min_ids = (
            Jobs.objects
            .filter(resource_uri__in=[duplicate['resource_uri'] for duplicate in duplicate_rows])
            .values('resource_uri')
            .annotate(min_id=Min('id'))
        )

        ids_to_delete = (
            Jobs.objects
            .filter(resource_uri__in=[duplicate['resource_uri'] for duplicate in duplicate_rows])
            .exclude(id__in=[min_id['min_id'] for min_id in min_ids])
            .values_list('id', flat=True)
        )

        deleted_count, _ = Jobs.objects.filter(id__in=ids_to_delete).delete()

        self.stdout.write(self.style.SUCCESS(f'Deleted {deleted_count} duplicate rows.'))
