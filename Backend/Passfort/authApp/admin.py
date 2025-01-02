from django.contrib import admin
from .models import UserProfile
# Register your models here.

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'password_reset_done']  # This will display the user and password_reset_done fields in the list view
    list_filter = ['password_reset_done']  # Adds a filter option by password_reset_done
    search_fields = ['user__username']  # Optional: Add search functionality by username


admin.site.register(UserProfile, UserProfileAdmin)