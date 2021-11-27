# from djangorestframework_camel_case.parser import CamelCaseJSONParser
# from rest_framework.renderers import JSONRenderer
from rest_framework import status
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, ListModelMixin, \
    DestroyModelMixin
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from .filters import ToDoFilter, ProjectFilter
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer

"""
Model Project: доступны все варианты запросов; для постраничного вывода установить размер страницы 10 записей; 
добавить фильтрацию по совпадению части названия проекта;
"""


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectLimitOffsetPaginatonViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


"""
Model ToDo: доступны все варианты запросов; при удалении не удалять ToDo, а выставлять признак, что оно закрыто; 
добавить фильтрацию по проекту; для постраничного вывода установить размер страницы 20.
"""


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    filterset_class = ToDoFilter
    pagination_class = TodoLimitOffsetPagination

    def destroy(self, request, *args, **kwargs):
        todo = self.get_object()
        todo.is_active = False
        todo.save()
        return Response(data='Todo set is active false')
