from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    path('auth/', include('accounts.urls')),
    path('app/', include('app.urls')),
    re_path('.*', views.index, name="index")
]
