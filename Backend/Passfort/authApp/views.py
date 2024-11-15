from django.shortcuts import render
# used to return standard http response statuses
from rest_framework import status
# used to return JSON response in the API views
from rest_framework.response import Response
# @api_view is a decorator provided by DRF that specifies which HTTP methods 
# (GET, POST, etc.) are allowed for a particular view.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializer import UserRegistrationSerializer, UserLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken


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


@api_view(['POST'])
@permission_classes([AllowAny])
def user_login_view(request):
    serializer= UserLoginSerializer(data= request.data)
    if serializer.is_valid():
        return Response(
            {
                "message": "Login successful.",
                "tokens": serializer.validated_data,
            },
            status= status.HTTP_200_OK
        )
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def user_logout_view(request):
    try:
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({'error': 'Refresh token is required'}, status= status.HTTP_400_BAD_REQUEST)
        
        # blacklisting the refresh token
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)