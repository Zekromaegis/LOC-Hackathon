from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

app_name="PLacementPrediction"

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),

    path('student/create/',views.StudentCreate.as_view()),
    path('student/update/', views.StudentUpdate.as_view()),
    path('user/create/', views.UserCreate.as_view()),
    path('user/update/',views.UserUpdate.as_view()),
    path('api-token-auth/', obtain_auth_token, name='api-token-auth'),
]
