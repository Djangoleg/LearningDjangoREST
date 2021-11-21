from rest_framework.exceptions import ValidationError
from rest_framework.relations import StringRelatedField, PrimaryKeyRelatedField, RelatedField, ManyRelatedField, \
    HyperlinkedRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from users.models import User
from users.serializers import UserModelSerializer
from .models import Project, ToDo


class UserRelatedField(StringRelatedField):

    def to_internal_value(self, value):
        user = User.objects.filter(username=value)
        if user and (len(user)) == 1:
            return user.get().id
        else:
            raise ValidationError(f"User with name: {value} not found")


class ProjectModelSerializer(ModelSerializer):
    # user = StringRelatedField(many=True)
    user = UserRelatedField(many=True)

    class Meta:
        model = Project
        fields = ('name', 'url', 'user')


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = ('project', 'text', 'user', 'is_active')
