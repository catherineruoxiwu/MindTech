from django.db import models

# Create your models here.


class Session(models.Model):
    session_id = models.BigAutoField(primary_key=True)
    user_id = models.BigIntegerField()
    description = models.CharField(max_length=32)


class Message(models.Model):
    message_id = models.BigAutoField(primary_key=True)
    session_id = models.BigIntegerField()
    role = models.CharField(max_length=24)  # AI or User
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
