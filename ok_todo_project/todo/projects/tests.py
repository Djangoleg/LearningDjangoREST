from django.test import TestCase
from requests.auth import HTTPBasicAuth
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase, \
    CoreAPIClient
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ToDoModelViewSet, ProjectLimitOffsetPaginatonViewSet
from .models import Project, ToDo, User


class UserModelViewSet(TestCase):

    def setUp(self) -> None:
        self.url = '/api/users/'
        self.data = {'first_name': 'Alex', 'last_name': 'Pushkin', 'username': 'ap',
                     'email': 'pushkin@thesonofbitch.com'}

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


class ProjectModelViewSet(APITestCase):

    def setUp(self) -> None:
        self.url = '/api/todo/'
        self.name = 'admin'
        self.password = 'admin_123456789'
        self.admin = User.objects.create_superuser(self.name, 'admin@mail.ru', self.password)
        # self.data = {'name': 'Разработка', 'repo_url': 'https://www.ya.ru'}

    def test_get_list(self):
        """
         Тест для API, используя APITestCase
        :return:
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_todo(self):
        # project = Project.objects.create(**self.data)
        project = mixer.blend(Project, name='Разработка')
        todo = ToDo.objects.create(text='test todo', project=project, user=self.admin)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{todo.id}/', {'text': 'Test_1000', 'user': todo.user.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(new_todo.text, 'Test_1000')
        self.client.logout()

    def test_create_todo(self):
        """
        Тест для API, использование CoreAPIClient из Live test
        :return:
        """
        project = mixer.blend(Project, name='Разработка теста')

        todo = ToDo.objects.create(text='CoreAPIClient test todo', project=project, user=self.admin)

        client = CoreAPIClient()

        client.session.auth = HTTPBasicAuth(self.name, self.password)

        schema = client.get('http://127.0.0.1:8000/schema/', )

        data = client.action(schema, ['api', 'todo', 'list'])

        # Проверяем, что заметка создана.
        assert (len(data['results']) == 1)

        # Проверяем, что это наша заметка.
        assert (data['results'][0]['text'] == 'CoreAPIClient test todo')


