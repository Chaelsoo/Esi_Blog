from rest_framework import serializers
from .models import Article
from users.models import CustomUser

class AuthorUsernameField(serializers.Field):
    def to_representation(self, value):
        return value.username

    def to_internal_value(self, data):
        return CustomUser.objects.get(username=data)

class ArticleSerializer(serializers.ModelSerializer):
    author = AuthorUsernameField()
    class Meta:
        model = Article
        fields = '__all__'
        
class UpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('title','content')
        
        
class PublishSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Article
        fields = ('title', 'content', 'author')