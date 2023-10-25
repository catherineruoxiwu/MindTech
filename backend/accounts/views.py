from django.shortcuts import render, redirect
from rest_framework.views import APIView
from accounts.models import UserAccount
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class CheckEmail(APIView):
    permission_classes = ()
    authentication_classes = ()

    def get(self, request):
        try:
            email = request.GET.get("email")
            if UserAccount.objects.is_exists(email):
                return Response(
                    {"success": "this email already exists", "exist": True},
                    status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"success": "this email can be used", "exist": False},
                    status.HTTP_200_OK,
                )
        except:
            return Response(
                {"error": "are you sure the param is an email ? not found"},
                status.HTTP_400_BAD_REQUEST,
            )
