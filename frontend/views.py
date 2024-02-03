
import os
import logging
from django.http import HttpResponse
from django.shortcuts import render,redirect

db_logger = logging.getLogger('db') 

"""
Index Page
"""
def index(request):
        if request.user.is_authenticated == True and request.user.is_superuser:
            return redirect('admin:index')
        else:
            return render(request, "index.html", {'status' : 'home'})





"""
error pages
"""

def error_404(request, exception):
    return render(request,'frontend/404.html')
    
def error_500(request):
    db_logger.exception("internal server error")
    return render(request,'frontend/404.html')
    
def error_400(request, exception):
    return render(request, 'frontend/404.html', status=404)
