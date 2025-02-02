from django.db import models
from django.contrib.auth.models import User
from .utils import encrypt_data, decrypt_data

# Create your models here.
class VaultLabel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vault_labels')
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'name')

    def save(self, *args, **kwargs):
        self.name = self.name.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'vault for {self.name}'
    
    
class UserCredential(models.Model):
    label = models.ForeignKey(VaultLabel,on_delete=models.CASCADE, related_name='user_credentials')
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    notes = models.TextField(blank=True, null= True)
    created_at = models.DateTimeField(auto_now_add=True)

    # def save(self, *args, **kwargs):
    #     if self.password:
    #          self.password = encrypt_data(self.password)
    #     super().save(*args, **kwargs)
    def save(self, *args, **kwargs):
        if self.password:
            if self._state.adding or not self.password.startswith('gAAAAA'):  # Encrypt only new or unencrypted passwords
                self.password = encrypt_data(self.password)
        super().save(*args, **kwargs)



    def get_decrypted_password(self):
        # Decrypt the password when needed
        return decrypt_data(self.password) if self.password else None



    def __str__ (self):
        return f'credentials for {self.label.name} ({self.username})'