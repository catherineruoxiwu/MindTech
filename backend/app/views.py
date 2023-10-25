from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from app.models import Session, Message
from utils import ChatGPT_api

# Create your views here.
class CreateSession(APIView):
    def post(self, request):
        try:
            Session.objects.create(user_id=request.user.id)
            return Response(status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(data={"error": e}, status=status.HTTP_400_BAD_REQUEST)


class DeleteSession(APIView):
    def post(self, request):
        try:
            session_id = request.data["session_id"]
            Session.objects.get(session_id=session_id).delete()
            Message.objects.filter(session_id=session_id).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(data={"error": e}, status=status.HTTP_400_BAD_REQUEST)


class AIQuery(APIView):
    def post(self, request):
        try:
            message = request.data["message"]
            session_id = request.data["session_id"]
            #  query GPT
            response_message = ChatGPT_api.generateResponse(message)
            user_message = {
                "session_id": session_id,
                "role": "User",
                "message": message,
            }
            chatGPT_message = {
                "session_id": session_id,
                "role": "AI",
                "message": response_message,
            }

            if Message.objects.filter(session_id=session_id).count() == 0:
                # add desc to session_id
                session = Session.objects.get(session_id=session_id)
                session.description = message[:32]
                session.save()
            Message.objects.create(**user_message)
            Message.objects.create(**chatGPT_message)

            return Response(chatGPT_message, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetSessionList(APIView):
    def get(self, request):
        try:
            session_list = Session.objects.filter(user_id=request.user.id).values()
            session_list = list(session_list)
            return Response({"session_list": session_list}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": e}, status=status.HTTP_400_BAD_REQUEST)


class GetMessageList(APIView):
    def get(self, request):
        try:
            session_id = request.GET.get("session_id")
            message_list = (
                Message.objects.filter(session_id=session_id).order_by("date").values()
            )
            message_list = list(message_list)
            return Response({"message_list": message_list}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"error": e}, status=status.HTTP_400_BAD_REQUEST)
