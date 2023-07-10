from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.safestring import mark_safe
from django.shortcuts import redirect

import os

op = os.path.join


@csrf_exempt
def test(request):
    
    print(request.GET)
    print(request.POST)

    # data = request.GET.get('q')

    # print(data)

    return HttpResponse(f"200")

