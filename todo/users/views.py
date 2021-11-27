from rest_framework.generics import UpdateAPIView, RetrieveAPIView
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


"""
Model User: есть возможность просмотра списка и каждого пользователя в отдельности, 
можно вносить изменения, нельзя удалять и создавать;
"""


class UserModelCustomViewSet(RetrieveModelMixin,
                             UpdateModelMixin,
                             ListModelMixin,
                             GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
