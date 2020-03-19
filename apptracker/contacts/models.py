from django.db import models


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    comments = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
