from django.urls import path
from . import views

urlpatterns = [
#        path('login', views.login_api, name='login_api'),
#        path('register', views.register_api, name='register_api'),
#    path('test', views.test, name='test'),
    path('upload_review', views.upload_review, name='upload_review'),
]
