from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.safestring import mark_safe
from django.shortcuts import redirect

import os
import random
# import bcrypt
import sys

### HOME ###

@csrf_exempt
def home(request):
    return render(request, 'page/home.html', {})

@csrf_exempt
def magazine(request):
    return render(request, 'page/magazine.html', {})


### REVIEW ###

@csrf_exempt
def review(request):
    return render(request, 'page/review.html', {})

@csrf_exempt
def review_uploaded(request):
    return render(request, 'page/review_uploaded.html', {})

@csrf_exempt
def review_tab(request):
    return render(request, 'page/review_tab.html', {})

@csrf_exempt
def review_detail(request):

    print(request.POST.get('cid'))

    return render(request, 'page/review_detail.html', {})


### PROMOTION ###

@csrf_exempt
def promotion_tab(request):
    return render(request, 'page/promotion_tab.html', {})


### USER ###

@csrf_exempt
def user_tab(request):
    return render(request, 'page/user_tab.html', {})