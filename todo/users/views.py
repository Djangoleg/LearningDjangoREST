from rest_framework import generics
from rest_framework.generics import UpdateAPIView, RetrieveAPIView
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerV2


class UserModelCustomViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserModelListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    # serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerV2
        return UserModelSerializer
