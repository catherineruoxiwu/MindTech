from django.urls import path, include, re_path
from accounts.views import CheckEmail

urlpatterns = [
    path('check-email/', CheckEmail.as_view()),
]
