from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.safestring import mark_safe
from django.shortcuts import redirect
from django.views.decorators.http import require_POST

import os

op = os.path.join


@csrf_exempt
def test(request):
    
    print(request.body)
    # print(request.POST)

    # data = request.GET.get('q')

    # print(data)

    return HttpResponse(f"200")

