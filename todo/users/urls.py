from django.urls import path

from users.views import UserModelListAPIView

app_name = 'users'

urlpatterns = [
    path('', UserModelListAPIView.as_view()),
]