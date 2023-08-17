from rest_framework.decorators import api_view, permission_classes
from .models import CustomUser
from django.shortcuts import render, redirect
from .serializers import *
from rest_framework.response import Response
from rest_framework import generics,status
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import check_password
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.utils.encoding import force_bytes,force_str,DjangoUnicodeDecodeError
from .utils import account_activation_token
from django.contrib import messages
from django.core.mail import EmailMessage
from rest_framework.permissions import IsAuthenticated









    

def activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(id=uid)
    except:
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_valid = True
        user.save()

        return redirect('http://localhost:5173/auth/login/')
    else:
        pass
    return redirect('http://localhost:5173/auth/confirm/')


def activateEmail(request, user, to_email):
    mail_subject = "Activate your user account."
    message = render_to_string("activate.html", {
        'user': user.username,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(user.id)),
        'token': account_activation_token.make_token(user),
        "protocol": 'https' if request.is_secure() else 'http'
    })
    email = EmailMessage(mail_subject, message, to=[to_email])
    if email.send():
        print("Another user waiting for verification ", user.username)



@api_view(['GET'])
def list(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response({"data":serializer.data}, status=status.HTTP_200_OK)   


@api_view(['POST'])
def login(request): 
    serializer = LogUser(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({"Wrong Credentials": "Try Again"}, status=status.HTTP_401_UNAUTHORIZED)

        if not user.is_valid:
            return Response({"Email":"Not Verified"},status=status.HTTP_403_FORBIDDEN)
        if check_password(password, user.password):
            return Response({"Successful": "Logged in"}, status=status.HTTP_200_OK)
        return Response({"Wrong Credentials": "Try Again"}, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response({"Invalid":"Bad Request"},status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def register(request):
    serializer = CreateUserSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        username = serializer.validated_data['username']
        
        try:
            validate_password(password, user=None)
        except ValidationError as e:
            return Response({"Invalid Request": e}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = CustomUser.objects.create_user(email=email,username=username,password=password)
        
        activateEmail(request,user,user.email)
        
        return Response({"Valid":"User Created"},status=status.HTTP_201_CREATED)
    return Response({"Invalid":"Something Occured"},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def user(request, id):
    looking = CustomUser.objects.filter(id=id).first()
    if looking:
        serializer = UserSerializer(instance=looking)  
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"invalid": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def change_password(request):

    serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        id = serializer.validated_data['id']
        user = CustomUser.objects.filter(id=id).first() 
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        old_password = serializer.validated_data['old_password']
        if not user.check_password(old_password):
            return Response({"error": "Old password is incorrect"}, status=status.HTTP_401_UNAUTHORIZED)
        
        new_password = serializer.validated_data['new_password']
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PATCH'])
def change_username(request):
    serializer = ChangeUsernameSerializer(data=request.data)
    if serializer.is_valid():
        print(serializer.validated_data)
        id = request.data.get('id')
        username = serializer.validated_data['username']
        

        user = CustomUser.objects.filter(id=id).first()
        if not user:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        user.username = username
        user.save(update_fields=['username'])
        return Response({"Successful": "Username Changed"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def current(request):
    user = request.user.username
    return Response(user,status=status.HTTP_200_OK)
