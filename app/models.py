from django.db import models

# Create your models here.
class Author(models.Model):
	AuthorID=models.AutoField(primary_key = True)
	Name=models.CharField(max_length=100)
	Age=models.PositiveIntegerField()
	Country=models.CharField(max_length=50)


class Book(models.Model):
	ISBN=models.CharField(max_length=50,primary_key = True)
	Title=models.CharField(max_length=200)
	AuthorID=models.ForeignKey(Author)
	Publisher=models.CharField(max_length=50)
	PublishDate=models.DateField()
	Price=models.FloatField()

