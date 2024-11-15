# Serializers convert json files to python objects and vice versa

from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

user =  get_user_model()

# Registration serializer
class UserRegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = user
        fields =  ['id','username','email','password','confirm_password']
        extra_kwargs = {'password': {'write_only': True}}

    
    def validate(self, attrs):
        password =  attrs.get('password')
        confirm_password = attrs.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError({'confirm_password':'Passwords do not match.'})
        
        # Check for duplicate username
        if user.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError({'username': 'Username is already taken.'})

        # Check for duplicate email
        if user.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({'email': 'Email is already registered.'})

        
        return attrs
    

    def create(self, validated_data):
        validated_data.pop('confirm_password') # Remove the confirm password field before creating the user
        user = User.objects.create_user(**validated_data)
        return user
    


# Login serializer
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only = True)

    def validate(self, attrs):
        username= attrs.get('username')
        password= attrs.get('password')
        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError('Invalid Credentials')


        # user = User.objects.get(username = attrs['username'])

        # if not user.check_password(attrs['password']):
        #     raise serializers.ValidationError('Invalid Credentials')
        
        refresh = RefreshToken.for_user(user)
        return {
            'access' : str(refresh.access_token),
            'refresh' : str(refresh),
        }