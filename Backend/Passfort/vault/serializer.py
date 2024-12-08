# from rest_framework import serializers
# from .models import VaultLabel, UserCredential
# from .utils import encrypt_data, decrypt_data

# class VaultLabelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = VaultLabel
#         fields = ['id', 'name', 'created_at']


# class UserCredentialSerializer(serializers.ModelSerializer):
#     label = serializers.StringRelatedField()  # displays the label's name instead of the id

#     class Meta:
#         model = UserCredential
#         fields = ['id', 'label', 'username', 'password', 'notes', 'created_at']
#         extra_kwargs = {
#             'password': {'write_only': True},  # Don't show password in responses
#         }

#     def create(self, validated_data):
#         # to encrypt the password before saving
#         password = validated_data.get('password')
#         validated_data['password'] = encrypt_data(password)
#         return super().update(instance=)