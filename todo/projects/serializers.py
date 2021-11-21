from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from users.serializers import UserModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(ModelSerializer):
    # user = StringRelatedField(many=True)
    # user = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = ('project', 'text', 'user', 'is_active')


