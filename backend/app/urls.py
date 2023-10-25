from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path("create-session/", views.CreateSession.as_view()),
    path("delete-session/", views.DeleteSession.as_view()),
    path("ai-query/", views.AIQuery.as_view()),
    path("get-sessions/", views.GetSessionList.as_view()),
    path("get-messages/", views.GetMessageList.as_view()),
]
