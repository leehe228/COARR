from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.safestring import mark_safe
from django.shortcuts import redirect

from api.models import Content, User, Restaurant

import os
import random
# import bcrypt
import sys
import json

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

    contents = Content.objects.all()

    datas = []

    for content in contents:
        
        temp = json.loads(content.CONTENT)

        if content.CID == 52:
            continue

        datas.append([str(content.CID), temp['title']])

    return render(request, 'page/review_tab.html', {'datas' : datas})

@csrf_exempt
def review_detail(request):

    print(request.GET['cid'])
    try:
        cid = int(request.GET['cid'])
    except:
        cid = 0

    bp = Content.objects.get(CID=cid)
    print(bp.CONTENT)

    datas = json.loads(bp.CONTENT)
    
    title = datas['title']
    content1 = datas['content1']
    content2 = datas['content2']
    rid = datas['RID']
    rname = datas['RNAME']
    uid = datas['UID']
    visit_date = datas['visit_date']

    if cid <= 52:
        num_follows = 217
        writer_name = "SeungJun Lee"
    else:
        num_follows = 0
        writer_name = "Test User"

    # image
    content1.replace('<img', '<img class=\"main-view-img\"')

    return render(request, 'page/review_detail.html', {'title': title, 'content1': content1, 'content2': content2, 
                                                       'rid': rid, 'rname': rname, 'uid': uid, 'visit_date': visit_date, 
                                                       'num_follows': num_follows, 'writer_name': writer_name})


### PROMOTION ###

@csrf_exempt
def promotion_tab(request):
    return render(request, 'page/promotion_tab.html', {})


### USER ###

@csrf_exempt
def user_tab(request):
    return render(request, 'page/user_tab.html', {})