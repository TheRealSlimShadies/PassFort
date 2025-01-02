# this is for whevever a new user is created. a user profile field for that user is also created automatically. all this is for one time pw reset event

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        print(f"New user created: {instance.username}")
        UserProfile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     if not hasattr(instance, 'userprofile'):
#         return
    
#     user_profile = instance.userprofile
    
#     # Only save the profile if the 'password_reset_done' field is not already set
#     if user_profile.password_reset_done is False:
#         user_profile.save()
