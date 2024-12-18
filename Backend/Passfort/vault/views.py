from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import VaultLabel, UserCredential
from .serializer import VaultLabelSerializer, UserCredentialSerializer
from rest_framework.permissions import IsAuthenticated

# retrieve all vault labels for the authenticated user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_vault_labels(request):
    if request.user.is_authenticated:
        vault_labels = VaultLabel.objects.filter(user=request.user)
        serializer = VaultLabelSerializer(vault_labels, many=True)
        return Response(serializer.data)
    return Response({"detail": "Authentication credentials were not provided."}, status=401)

# create a new vault label
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_vault_label(request):
    if request.user.is_authenticated:
        serializer = VaultLabelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # associate the label with the authenticated user
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    return Response({"detail": "Authentication credentials were not provided."}, status=401)

# delete a specific vault label
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_vault_label(request, label_id):
    try:
        vault_label = VaultLabel.objects.get(id=label_id, user=request.user)
        vault_label.delete()  # This will delete the vault label and associated credentials (due to CASCADE)
        return Response({"detail": "Vault label deleted successfully."}, status=204)
    except VaultLabel.DoesNotExist:
        return Response({"detail": "Vault label not found or you're not authorized to delete it."}, status=404)

# retrieve all user credentials for a specific vault label
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_credentials(request, label_id):
    if request.user.is_authenticated:
        try:
            vault_label = VaultLabel.objects.get(id=label_id, user=request.user)
            credentials = UserCredential.objects.filter(label=vault_label)
            serializer = UserCredentialSerializer(credentials, many=True)
            return Response(serializer.data)
        except VaultLabel.DoesNotExist:
            return Response({"detail": "Vault label not found."}, status=404)
    return Response({"detail": "Authentication credentials were not provided."}, status=401)

# create new user credentials under a specific vault label
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_user_credential(request, label_id):
    if request.user.is_authenticated:
        try:
            vault_label = VaultLabel.objects.get(id=label_id, user=request.user)
            serializer = UserCredentialSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(label=vault_label)  # associate the credentials with the vault label
                return Response(serializer.data, status=201)
            return Response(serializer.errors, status=400)
        except VaultLabel.DoesNotExist:
            return Response({"detail": "Vault label not found."}, status=404)
    return Response({"detail": "Authentication credentials were not provided."}, status=401)

# Delete a specific user credential
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_credential(request, label_id, credential_id):
    try:
        vault_label = VaultLabel.objects.get(id=label_id, user=request.user)
        credential = UserCredential.objects.get(id=credential_id, label=vault_label)
        credential.delete()
        return Response({"detail": "User credential deleted successfully."}, status=200)
    except VaultLabel.DoesNotExist:
        return Response({"detail": "Vault label not found or you're not authorized to delete credentials under it."}, status=404)
    except UserCredential.DoesNotExist:
        return Response({"detail": "User credential not found."}, status=404)