from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
  
    # path('', views.index),
    path('user-registration/', views.user_registration_view, name= 'user-registration'),
    path('user-login/', views.user_login_view, name= 'user-login'),
    path('user-logout/', views.user_logout_view, name= 'user-logout'),
    path('user-delete/', views.delete_user_view, name= 'user-delete'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
]