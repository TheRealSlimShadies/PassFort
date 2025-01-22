from django.shortcuts import render, get_object_or_404
# used to return standard http response statuses
from rest_framework import status
# used to return JSON response in the API views
from rest_framework.response import Response
# @api_view is a decorator provided by DRF that specifies which HTTP methods 
# (GET, POST, etc.) are allowed for a particular view.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializer import UserRegistrationSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from django.core.mail import send_mail
from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.models import update_last_login
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

from .models import UserProfile

from django.conf import settings

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):

        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token =  tokens['refresh']

            res = Response()
            res.data = {'success' : True}
            
            res.set_cookie(
                key = 'access_token',
                value= access_token,
                httponly= True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key = 'refresh_token',
                value= refresh_token,
                httponly= True,
                secure=True,
                samesite='None',
                path='/'
            )

            return res

        except:
            return Response({'success': False})
        

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            request.data['refresh'] = refresh_token

            response =  super().post(request, *args, **kwargs)

            tokens = response.data
            access_token =  tokens['access']
            
            res = Response()
            res.data = {'Refreshed' : True}

            res.set_cookie(
                key = 'access_token',
                value = access_token,
                httponly= True,
                secure= True,
                samesite= 'None',
                path='/'
            )

            return res

        except:
            return Response({'Refreshed': False})



@api_view(['POST'])
@permission_classes([AllowAny]) # Allow this view to be accessed without authentication... for now... will comment out later when frontend stuff is ready
def user_registration_view(request):
    serializer= UserRegistrationSerializer(data= request.data)
    if serializer.is_valid():
        user= serializer.save()
        return Response(
            {
                'message': 'User successfully created.',
                'user': serializer.data,
            },
            status= status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def user_login_view(request):
#     serializer= UserLoginSerializer(data= request.data)
#     if serializer.is_valid():
#         return Response(
#             {
#                 "message": "Login successful.",
#                 "tokens": serializer.validated_data,
#             },
#             status= status.HTTP_200_OK
#         )
#     return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout_view(request):
    try:

        # Get the refresh token from cookies
        refresh_token = request.COOKIES.get('refresh_token')

        # If no refresh token is found, return an error
        if not refresh_token:
            return Response({'error': 'Refresh token is missing'}, status=400)

        # Blacklist the refresh token
        token = RefreshToken(refresh_token)
        token.blacklist()
        

        res = Response()
        res.data = {'success' : True}
        res.delete_cookie('access_token', path='/', samesite = 'None')
        res.delete_cookie('refresh_token', path='/', samesite = 'None')
        return res
    
    except:
        return Response({'success':False})
    

#this is_authenticated view is just to test if someone is logged in or not. its whatever   
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'Authenticated' : True})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])  # ensure only authenticated users can delete their own account
def delete_user_view(request):
    try:
        # get the currently authenticated user
        user = request.user
        
        # delete the user
        user.delete()

        return Response({"message": "User account deleted successfully."}, status=200)
    
    except Exception as e:
        return Response({"error": str(e)}, status=400)
    

# password reset views
@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request_view(request):
    serializer = PasswordResetRequestSerializer(data=request.data)

    if serializer.is_valid():
        email = serializer.validated_data['email']
        user = get_object_or_404(User, email=email)

        # check if password has already been reset
        if user.userprofile.password_reset_done:
            return Response({"error": "Password has already been reset for this account."}, status=400)

        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        # Send the reset email
        # might need to fix the url link based on the frontend files locations for the forms...
        reset_link = f"{settings.FRONTEND_URL}/reset-password-confirm/{uid}/{token}/"
        try:
            send_mail(
                subject="Password Reset Request",
                message=f"Click the link to reset your password: {reset_link}",
                from_email="noreplypassfort@gmail.com",
                recipient_list=[email],
            )
            return Response({"message": "Password reset link sent to your email."}, status=200)
        except Exception as e:
             return Response({"error": "Failed to send email. Please try again later."}, status=500)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm_view(request):
    serializer = PasswordResetConfirmSerializer(data=request.data)

    if serializer.is_valid():
        try:
            uid = force_str(urlsafe_base64_decode(serializer.validated_data['uid']))
            print(f"Decoded UID: {uid}")
            user = get_object_or_404(User, pk=uid)
            token_generator = PasswordResetTokenGenerator()
            
            # Verify the token
            if not token_generator.check_token(user, serializer.validated_data['token']):
                return Response({"error": "Invalid or expired token."}, status=400)
            
            # Validate the new password
            new_password = serializer.validated_data['new_password']
            try:
                validate_password(new_password, user)
            except ValidationError as e:
                return Response({"error": e.messages}, status=400)
            
            # Reset the password
            user.set_password(serializer.validated_data['new_password'])
            print('about to hit save....')
            user.save()
            print(f"Password reset successfully for user {user.username}.")

            # Handle UserProfile logic (e.g., updating the password_reset_done flag)
            user_profile, created = UserProfile.objects.get_or_create(user=user)
            user_profile.password_reset_done = True
            user_profile.save()  # Ensure changes are saved to the database

            print(f"password_reset_done updated for {user.username}: {user_profile.password_reset_done}")

            update_last_login(None, user)  # invalidate old sessions

            return Response({"message": "Password reset successful."}, status=200)
        except TypeError:
            return Response({"error": "Type error in the request."}, status=400)
        except ValueError:
            return Response({"error": "Value error in the request."}, status=400)
        except OverflowError:
            return Response({"error": "Overflow error in the request."}, status=400)
        except User.DoesNotExist:
            return Response({"error": "Invalid user."}, status=400)

    return Response(serializer.errors, status=400)
