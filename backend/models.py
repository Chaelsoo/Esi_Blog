from django.db import models
from django.utils import timezone
from django.conf import settings
from users.models import CustomUser  # Make sure to import the CustomUser model

class Article(models.Model):
    title = models.CharField(max_length=40)
    content = models.TextField(max_length=500)
    published = models.DateTimeField(default=timezone.now)
    modified = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
        
    def __str__(self):
        return self.title

