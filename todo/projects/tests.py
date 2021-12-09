from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ToDoModelViewSet, ProjectLimitOffsetPaginatonViewSet
from .models import Project, ToDo, User


class UserModelViewSet(TestCase):
    # url = '/api/todo/'

    def setUp(self) -> None:
        self.url = '/api/users/'
        self.data = {'first_name': 'Alex', 'last_name': 'Pushkin', 'username': 'ap', 'email': 'pushkin@thesonofbitch.com'}

    def test_get_list(self):
        """
        Тест для API, используя APIRequestFactory.
        :return:
        """
        factory = APIRequestFactory()
        request = factory.get('/api/todo/')
        view = ToDoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        """
         Тест для API, используя APIClient.
        :return:
        """
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestProjectViewSet(APITestCase):

    def setUp(self) -> None:
        self.url = '/api/projects/'

        self.name = 'admin'
        self.password = 'admin_123456789'
        self.admin = User.objects.create_superuser(self.name, 'admin@mail.ru', self.password)

    def test_get_list(self):
        """
         Тест для API, используя APITestCase
        :return:
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)