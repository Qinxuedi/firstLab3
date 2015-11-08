from django.conf.urls import patterns, include, url
from django.contrib import admin
from app.views import *
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import staticfiles

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Lab3.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    (r'^$',first),
    (r'^introduction/(\d+)/$',introduction),
    (r'^delete/(\d+)/$',delete),
    (r'^change/(\d+)/$',change),
    (r'^add/$',add),
    (r'^check_author/',check_author),
    (r'^check_book/',check_book),
    (r'^search_result/$',search_result),
    url(r'^admin/', include(admin.site.urls)),
)
urlpatterns += staticfiles_urlpatterns()
