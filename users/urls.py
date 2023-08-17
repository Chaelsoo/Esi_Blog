from django.urls import path
from .views import *
 
urlpatterns = [
    path('login/',login),
    path('register/',register),
    path('list/',list),
    path('activate/<uidb64>/<token>', activate, name='activate'),
    path('user/<int:id>/',user),
    path('pass/',change_password),
    path('name/',change_username),
    path('current/',current)
    
]