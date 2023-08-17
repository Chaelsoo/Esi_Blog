from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email,username , password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email,username=username , **extra_fields)
        user.set_password(password)
        if user.is_superuser:
            user.is_valid = True
        else:
            user.is_valid = False
        user.save()
        return user
    
    def create_superuser(self, email, username=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_valid', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        if username is None:
            username = input("Enter a username for the superuser: ")

        return self.create_user(email, username, password, **extra_fields)
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, max_length=100)
    username = models.CharField(max_length=20,unique=True)
    password = models.CharField(max_length=30)
    date_joined = models.DateTimeField(auto_now=True)
    is_valid = models.BooleanField(default=False) 
    # profile_picture = models.ImageField()
    
    USERNAME_FIELD = "email"
    
    REQUIRED_FIELDS = ["username"]
    objects = CustomUserManager()
    
    def __str__(self):
        return self.username
