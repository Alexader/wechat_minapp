from django.urls import path

from . import views

urlpatterns = [
    path('createGroup', views.createGroup, name='createGroup'),
    path('createUser', views.createUser, name='createUser'),
    path('getGroup', views.getGroup, name='getGroup'),
    path('getGroups', views.getGroups, name='getGroups'),
    path('groups/hot', views.hotSections, name='hotSections')
]