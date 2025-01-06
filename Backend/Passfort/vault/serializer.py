from rest_framework import serializers
from .models import VaultLabel, UserCredential
from .utils import encrypt_data, decrypt_data


class VaultLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaultLabel
        fields = ['id', 'name', 'created_at']


class UserCredentialSerializer(serializers.ModelSerializer):
    label = serializers.StringRelatedField()  # Display the label's name
    password = serializers.CharField(write_only=True)  # Ensure password isn't returned in the response

    class Meta:
        model = UserCredential
        fields = ['id', 'label', 'username', 'password', 'notes', 'created_at']

    def create(self, validated_data):
        # Encrypt the password before saving
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Encrypt the password if it's being updated
        if 'password' in validated_data:
            validated_data['password'] = encrypt_data(validated_data['password'])
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        # Customize the data representation to exclude encrypted password
        representation = super().to_representation(instance)
        # representation['password'] = instance.get_decrypted_password()
        representation['password'] = decrypt_data(instance.password)
        return representation
