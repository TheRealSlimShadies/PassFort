# Serializers convert JSON data to Python objects and vice versa
from django.contrib.auth.models import User
from rest_framework import serializers

from django.core.mail import send_mail
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.conf import settings



# Registration Serializer
class UserRegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, help_text="Re-enter your password for confirmation")

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True, 'help_text': "Password must be at least 8 characters long"},
            'email': {'required':True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})

        # Check if the username is already taken
        if User.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({"username": "This username is already taken."})

        # Check if the email is already registered
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "This email is already registered."})

        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')  # Remove confirm_password before creating the user
        return User.objects.create_user(**validated_data)
    

#  Password reset serializer
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        user = User.objects.get(email=value)
        if user.userprofile.password_reset_done:  #check if the password reset flag is 'True'
            raise serializers.ValidationError("Password has already been reset for this account.")
        return value

    def get_reset_data(self, email):
        user = User.objects.get(email=email)
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        return uid, token


# Password reset confirmation serializer
class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return data

    def save(self):
        try:
            uid = force_str(urlsafe_base64_decode(self.validated_data['uid']))
            user = User.objects.get(pk=uid)
            token_generator = PasswordResetTokenGenerator()

            if not token_generator.check_token(user, self.validated_data['token']):
                raise serializers.ValidationError({"token": "Invalid or expired token."})

            # reset the password
            user.set_password(self.validated_data['new_password'])
            user.save()


            # update the field value after reset
            user.userprofile.password_reset_done = True
            user.userprofile.save()

            return user
        
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError({"uid": "Invalid user."})