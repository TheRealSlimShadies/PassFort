from cryptography.fernet import Fernet
from django.conf import settings

key = settings.ENCRYPTION_KEY.encode()
cipher_suite = Fernet(key)


def encrypt_data(data):
    # Encrypt the data using Fernet
    return cipher_suite.encrypt(data.encode()).decode()

def decrypt_data(data):
    # Decrypt the data using Fernet
    return cipher_suite.decrypt(data.encode()).decode()