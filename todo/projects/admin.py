from django.contrib import admin

from projects.models import Project


@admin.register(Project)
class UserAdmin(admin.ModelAdmin):
    model = Project

