from django.urls import path
from . import views  # Import views from the current app

urlpatterns = [
    # Vault Label endpoints
    path('labels/', views.get_vault_labels, name='get_vault_labels'),  
    path('labels/create/', views.create_vault_label, name='create_vault_label'),  
    path('labels/<int:label_id>/delete/', views.delete_vault_label, name='delete_vault_label'), 

    # User Credential endpoints
    # path('labels/<int:label_id>/credentials/', views.get_user_credentials, name='get_user_credentials'), 
    path('labels/credentials/', views.get_user_credentials, name='get_user_credentials'), 
    path('labels/<int:label_id>/credentials/create/', views.create_user_credential, name='create_user_credential'),  
    path('labels/<int:label_id>/credentials/<int:credential_id>/delete/', views.delete_user_credential, name='delete_user_credential'),  
]
