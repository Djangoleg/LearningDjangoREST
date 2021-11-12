from django.core.management.base import BaseCommand

from users.models import User


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()

        User.objects.create_superuser(username='ok',
                                      first_name='ok',
                                      last_name='super_ok',
                                      email='django2@geekshop.local',
                                      password='1')

        User.objects.create_user(username='testUser',
                                 first_name='testUser',
                                 last_name='testUserOff',
                                 email='testUser@geekshop.local',
                                 password='GeekBrains122@')

        User.objects.create_user(username='testUser2',
                                 first_name='testUser',
                                 last_name='testUserTwo',
                                 email='testoff@geekshop.local',
                                 password='GeekBrains122@')

