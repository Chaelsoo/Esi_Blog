from rest_framework import serializers
from .models import CustomUser



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id','email','username','password','date_joined','is_valid')
        
 
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email','username','password')

class LogUser(serializers.Serializer):
    class Meta:
        fields = ('email', 'password')

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


    
    
from django.contrib.auth.password_validation import validate_password


class ChangePasswordSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    old_password = serializers.CharField(required=True,max_length=30)
    new_password = serializers.CharField(required=True,max_length=30)

    def validate_old_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError("Incorrect old password")
        return value

    def validate_new_password(self, value):
        validate_password(value)
        return value

class ChangeUsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('usernminutesame','id')
        
    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username is already taken.")
        return value