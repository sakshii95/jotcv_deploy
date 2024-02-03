from django.core.management.base import BaseCommand
from django.utils import timezone
from accounts.models import User
from wallet.models import UserSubscription

class Command(BaseCommand):
    help = 'Check and update subscription status for users'

    def handle(self, *args, **options):
        now = timezone.now()
        subscriptions_to_update = UserSubscription.objects.filter(expiring_on__lte=now, is_active=True)

        for subscription in subscriptions_to_update:
            user = subscription.user
            user.has_subscription = False
            user.save()

            subscription.is_active = False
            subscription.save()

