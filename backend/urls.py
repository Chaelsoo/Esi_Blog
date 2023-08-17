from django.urls import path
from .views import *

urlpatterns = [
    path('',getall),
    path('publish/',publish),
    path('<int:id>/', modify_or_delete, name='modify-article'),
    path('specific/',get_user_articles),
    path('get/<int:pk>/',getarticle),
    path('publish/',publish)
    
]