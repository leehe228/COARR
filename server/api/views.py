from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.safestring import mark_safe
from django.shortcuts import redirect
from django.views.decorators.http import require_POST

import os
from urllib import parse
import json

op = os.path.join

# api key
import openai
import deepl
import time

openai.api_key = os.environ.get('OPENAI_API_KEY')
deepl_api_key = os.environ.get('DEEPL_API_KEY')

translator = deepl.Translator(deepl_api_key)

def ko2en(text):
    return translator.translate_text(text, source_lang="KO", target_lang="EN-US").text

def en2ko(text):
    return translator.translate_text(text, source_lang="KO").text


@csrf_exempt
def test(request):
    
    print(request.body)
    # print(request.POST)

    # data = request.GET.get('q')

    # print(data)

    return HttpResponse(f"200")


@csrf_exempt
@require_POST
def upload_review(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)

    return HttpResponse("OK")


@csrf_exempt
def review_gpt(data):
    


