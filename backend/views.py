from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from .models import Article
from .serializers import *
from rest_framework.response import Response
from rest_framework import generics,status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated



@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getall(request):
    article = Article.objects.all()
    serializer = ArticleSerializer(article,many=True)
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getarticle(request,pk):
    article = Article.objects.filter(id=pk).first()
    if article:
        serializer = ArticleSerializer(article)  
        return Response(serializer.data,status=status.HTTP_200_OK)    
    return Response({"invalid":"bad request"},status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_user_articles(request):
        articles = Article.objects.filter(author=request.user)
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def publish(request):
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
        article = serializer.save() 
        return Response(ArticleSerializer(article).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated]) 
def modify_or_delete(request, id):
    article = get_object_or_404(Article, id=id)
    if request.method == 'PATCH':
        serializer = UpdateSerializer(data=request.data)
        if serializer.is_valid():
            article.title = serializer.validated_data['title']
            article.content = serializer.validated_data['content']
            article.save(update_fields=['title', 'content', 'modified'])
            print("saved")
            return Response({"Valid": "Article Updated"}, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        article.delete()
        return Response({"Successful": "Article Deleted"}, status=status.HTTP_200_OK)   
    
@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def publish(request):
    data = request.data.copy()
    data['author'] = request.user.id
    serializer = PublishSerializer(data=data, context={'request': request})
    print(serializer.is_valid())
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
