import os
import json
from django.core.management.base import BaseCommand

from users.models import User

JSON_PATH = 'users/fixtures/'


def load_from_json(file_name):
    with open(file_name, mode='r', encoding='utf-8') as infile:
        return json.load(infile)


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        User.objects.create_superuser('django2', 'django2@geekshop.local', 'GeekBrains122@')
        my_users = load_from_json(JSON_PATH + 'users.json')
        
        for u in my_users:
            user_fields = u.get('fields')
            user_fields['id'] = u.get('pk')
            new_user = User(**user_fields)
            new_user.save()
