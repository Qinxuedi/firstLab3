from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect,HttpResponse
from models import Author,Book
from django.template import RequestContext
import datetime,json

# Create your views here.
def first(request):
	books={}
	lst=Book.objects.all()
	for book in lst:
		title=book.Title
		ISBN=book.ISBN
		introduce_url='/introduction/'+str(book.ISBN)+'/'
		author=book.AuthorID.Name
		delete_url='/delete/'+str(book.ISBN)+'/'
		change_url='/change/'+str(book.ISBN)+'/'
		books[ISBN]=(title,introduce_url,author,delete_url,change_url)
	return render_to_response('first.html',locals(),context_instance=RequestContext(request))

def introduction(request,book_id):
	book=Book.objects.get(ISBN=int(book_id))
	author=book.AuthorID
	Title=book.Title
	ISBN=book.ISBN
	Publisher=book.Publisher
	PublishDate=str(book.PublishDate.year)+'/'+str(book.PublishDate.month)+'/'+str(book.PublishDate.day)
	Price=book.Price
	Author=author.Name
	Age=author.Age
	Country=author.Country
	return render_to_response('introduce.html',locals(),context_instance=RequestContext(request))

def delete(request,book_id):
	book=Book.objects.get(ISBN=int(book_id))
	book.delete()
	return HttpResponseRedirect('/')

def search_result(request):
	user_input=request.POST['input']
	author=Author.objects.filter(Name=user_input)
	if author:
		books=Book.objects.filter(AuthorID=author[0])
		if books:
			exit=True
			dic={}
			for book in books:
				ISBN=book.ISBN
				url='/introduction/'+str(book.ISBN)+'/'
				dic[ISBN]=(book.Title,url)
		else:exit=False
	else:
		exit=False
	return render_to_response('search_result.html',locals(),context_instance=RequestContext(request))

def change(request,book_id):
    book=Book.objects.get(ISBN=int(book_id))
    book_name=book.Title
    if 'author_name' in request.POST:
        author_name=request.POST['author_name']
        publisher=request.POST['publisher']
        publish_year=request.POST['publish_year']
        publish_month=request.POST['publish_month']
        publish_day=request.POST['publish_day']
        price=request.POST['price']
        authors=Author.objects.filter(Name=author_name)
        if authors:
        	book.AuthorID=authors[0]
        else:
        	author_age=request.POST['author_age']
        	author_country=request.POST['author_country']
        	author=Author(Name=author_name,Age=int(author_age),Country=author_country)
        	author.save()
        	book.AuthorID=author
        book.Publisher=publisher
        book.PublishDate=datetime.date(int(publish_year),int(publish_month),int(publish_day))
        book.Price=float(price)
        book.save()
        return HttpResponseRedirect('/')
    else:
        author_name=book.AuthorID.Name
        publisher=book.Publisher
        publishDate=book.PublishDate
        publish_year=publishDate.year
        publish_month=publishDate.month
        publish_day=publishDate.day
        price=book.Price
        return render_to_response('change.html',locals(),context_instance=RequestContext(request))

def add(request):
	if 'book_name' in request.POST:
		book_name=request.POST['book_name']
		book_ISBN=request.POST['book_ISBN']
		author_name=request.POST['author_name']
		author_age=request.POST['author_age']
		author_country=request.POST['author_country']
		publisher=request.POST['publisher']
		publish_year=request.POST['publish_year']
		publish_month=request.POST['publish_month']
		publish_day=request.POST['publish_day']
		price=request.POST['price']
		authors=Author.objects.filter(Name=author_name)
		if authors:
			book=Book(ISBN=book_ISBN,Title=book_name,AuthorID=authors[0],Publisher=publisher,PublishDate=datetime.date(int(publish_year),int(publish_month),int(publish_day)),Price=float(price))
			book.save()
		else:
			author=Author(Name=author_name,Age=int(author_age),Country=author_country)
			author.save()
			book=Book(ISBN=book_ISBN,Title=book_name,AuthorID=author,Publisher=publisher,PublishDate=datetime.date(int(publish_year),int(publish_month),int(publish_day)),Price=float(price))
			book.save()
		return HttpResponseRedirect('/')
	else:
		return render_to_response('add.html',locals(),context_instance=RequestContext(request))

def check_author(request):
	author=None
	userinput=request.GET['userinput']
	result={}
	author=Author.objects.filter(Name=userinput)
	if author:
		result='1'
		result=json.dumps(result)
	else:
		result='0'
		result=json.dumps(result)
	return HttpResponse(result,content_type='application/json')

def check_book(request):
	book=None
	userinput=request.GET['userinput']
	result={}
	book=Book.objects.filter(ISBN=userinput)
	if book:
		result='1'
		result=json.dumps(result)
	else:
		result='0'
		result=json.dumps(result)
	return HttpResponse(result,content_type='application/json')