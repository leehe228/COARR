from django.urls import path
from . import views

urlpatterns = [
    ### HOME ###
    path('', views.home, name='home'),

    ### REVIEW ###
    path('review', views.review, name='review'),
    path('review_uploaded', views.review_uploaded, name='review_uploaded'),
    path('restaurant', views.review_tab, name='review_tab'),

    ### PROMOTION ###
    path('promotion', views.promotion_tab, name='promotion_tab'),

    ### USER ###
    path('user', views.user_tab, name='user_tab'),
]
