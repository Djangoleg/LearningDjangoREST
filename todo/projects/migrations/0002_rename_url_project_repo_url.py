# Generated by Django 3.2.9 on 2021-11-21 11:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='url',
            new_name='repo_url',
        ),
    ]
