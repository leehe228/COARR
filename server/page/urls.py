from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('review', views.review, name='review'),
    path('review_uploaded', views.review_uploaded, name='review_uploaded'),
    path('review_home', views.review_home, name='review_home'),
]
