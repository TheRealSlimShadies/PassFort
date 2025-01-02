from django.urls import path
from . import views

urlpatterns = [
  
    # path('', views.index),
    path('user-registration/', views.user_registration_view, name= 'user-registration'),
    # path('user-login/', views.user_login_view, name= 'user-login'),
    path('user-logout/', views.user_logout_view, name= 'user-logout'),
    path('user-delete/', views.delete_user_view, name= 'user-delete'),
    path('authenticated/', views.is_authenticated, name= 'authenticated'),
    
    path('api/login/', views.CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('api/token/refresh/', views.CustomTokenRefreshView.as_view(), name='custom_token_refresh'),
    
    path('password-reset/', views.password_reset_request_view, name='password-reset-request'),
    path('password-reset-confirm/', views.password_reset_confirm_view, name='password-reset-confirm'),
]