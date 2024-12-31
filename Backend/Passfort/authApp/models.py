from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    password_reset_done = models.BooleanField(default=False)

    def __str__(self):
        return f'Profile of {self.user.username}'