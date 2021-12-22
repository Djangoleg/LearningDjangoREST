from rest_framework.exceptions import ValidationError
from rest_framework.relations import StringRelatedField, PrimaryKeyRelatedField, RelatedField, ManyRelatedField, \
    HyperlinkedRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from users.models import User
from .models import Project, ToDo


class UserNameRelatedField(StringRelatedField):

    def to_internal_value(self, value):
        user = User.objects.filter(username=value)
        if user and (len(user)) == 1:
            return user.get().id
        else:
            raise ValidationError(f"User with name: {value} not found")


class UserIdRelatedField(StringRelatedField):

    def to_internal_value(self, value):
        user = User.objects.filter(id=value)
        if user and (len(user)) == 1:
            return value
        else:
            raise ValidationError(f"User with Id: {value} not found")


class ProjectRelatedField(StringRelatedField):

    def to_internal_value(self, value):
        project = Project.objects.filter(id=value)
        if project and (len(project)) == 1:
            return project.get().id
        else:
            raise ValidationError(f"Project with id: {value} not found")


class ProjectModelSerializer(ModelSerializer):
    # user = StringRelatedField(many=True)
    # user = UserNameRelatedField(many=True)
    user = UserIdRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'
        # fields = ('id', 'name', 'repo_url', 'user')


class ToDoModelSerializer(ModelSerializer):
    # user = UserRelatedField(many=False)
    # project = ProjectRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
        # fields = ('id', 'created_on', 'updated_on', 'project', 'project_id', 'text', 'user', 'is_active')
