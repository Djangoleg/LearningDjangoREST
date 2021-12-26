from django.contrib import admin

from projects.models import Project, ToDo

admin.site.register(Project)
admin.site.register(ToDo)
