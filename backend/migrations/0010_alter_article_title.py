# Generated by Django 4.2.3 on 2023-08-15 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_rename_author_id_article_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='title',
            field=models.CharField(max_length=40),
        ),
    ]