from rest_framework import serializers
from .models import VaultLabel, UserCredential
from .utils import encrypt_data, decrypt_data


class VaultLabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaultLabel
        fields = ['id', 'name', 'created_at']


# class UserCredentialSerializer(serializers.ModelSerializer):
#     label = serializers.StringRelatedField()  # Display the label's name
#     password = serializers.CharField(write_only=True)  # Ensure password isn't returned in the response

#     class Meta:
#         model = UserCredential
#         fields = ['id', 'label', 'username', 'password', 'notes', 'created_at']

#     def create(self, validated_data):
#         # Encrypt the password before saving
#         validated_data['password'] = encrypt_data(validated_data['password'])
#         return super().create(validated_data)

#     def update(self, instance, validated_data):
#         # Encrypt the password if it's being updated
#         if 'password' in validated_data:
#             validated_data['password'] = encrypt_data(validated_data['password'])
#         return super().update(instance, validated_data)

#     def to_representation(self, instance):
#         # Customize the data representation to exclude encrypted password
#         representation = super().to_representation(instance)
#         # representation['password'] = instance.get_decrypted_password()
#         representation['password'] = decrypt_data(instance.password)
#         return representation
class UserCredentialSerializer(serializers.ModelSerializer):
    label = serializers.StringRelatedField()  # Display the label's name
    password = serializers.CharField()  # Ensure password isn't returned in the response

    class Meta:
        model = UserCredential
        fields = ['id', 'label', 'username', 'password', 'notes', 'created_at']

    def create(self, validated_data):
        # Encrypt the password before saving
        print(f"Original Password: {validated_data['password']}")
        validated_data['password'] = encrypt_data(validated_data['password'])
        print(f"Encrypted Password: {validated_data['password']}")
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Encrypt the password if it's being updated
        if 'password' in validated_data:
            validated_data['password'] = encrypt_data(validated_data['password'])
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        # Only decrypt password when getting it, not during post requests
        if 'password' in representation:
            try:
                decrypted_password = decrypt_data(representation['password'])
                representation['password'] = decrypted_password
            except Exception as e:
                print(f"Decryption error: {e}")
        return representation

    