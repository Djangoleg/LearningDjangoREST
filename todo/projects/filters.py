from django_filters import rest_framework as filters
from .models import ToDo, Project


class ToDoFilter(filters.FilterSet):
    text = filters.CharFilter(lookup_expr='contains')
    created_on = filters.DateTimeFromToRangeFilter()

    class Meta:
        model = ToDo
        fields = ['id', 'text', 'project', 'created_on']


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']
