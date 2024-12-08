from django.contrib import admin
from .models import VaultLabel, UserCredential

# Register your models here.
admin.site.register(VaultLabel)
admin.site.register(UserCredential)