from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.safestring import mark_safe
from django.shortcuts import redirect

import os
import random
# import bcrypt
import sys

@csrf_exempt
def home(request):
    return render(request, 'page/home.html', {})

@csrf_exempt
def review(request):
    return render(request, 'page/review.html', {})
