from django.shortcuts import render
# used to return standard http response statuses
from rest_framework import status
# used to return JSON response in the API views
from rest_framework.response import Response
# @api_view is a decorator provided by DRF that specifies which HTTP methods 
# (GET, POST, etc.) are allowed for a particular view.
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializer import UserRegistrationSerializer, UserLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken

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
        res = Response()
        res.data = {'success' : True}
        res.delete_cookie('access_token', path='/', samesite = 'None')
        res.delete_cookie('refresh_token', path='/', samesite = 'None')
        return res
    
    except:
        return Response({'success':False})
    # try:
    #     refresh_token = request.data.get('refresh')
    #     if not refresh_token:
    #         return Response({'error': 'Refresh token is required'}, status= status.HTTP_400_BAD_REQUEST)
        
    #     # blacklisting the refresh token
    #     token = RefreshToken(refresh_token)
    #     token.blacklist()

    #     return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
    
    # except Exception as e:
    #     return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

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