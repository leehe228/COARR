from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.safestring import mark_safe
from django.shortcuts import redirect
from django.views.decorators.http import require_POST
from .models import User, Restaurant, Content

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
    return translator.translate_text(text, target_lang="KO").text

@csrf_exempt
@require_POST
def upload_review(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)

    body = body[0]

    title = body['title']
    content1 = body['content1']
    content2 = body['content2']

    text_data = title + "\n" + content1 + "\n" + content2

    # save
    CID = save_review(body)
    print(CID)
    review_gpt(text_data, body, CID)

    return HttpResponse("OK")


def save_review(jdata):

    newContent = Content(CTYPE="REVIEW", 
                         WRITER=int(jdata['UID']),
                         APPROVER=-1,
                         DELETED=0,
                         STATUS=0,
                         CONTENT=jdata,
                         NUM_LIKE=0,
                         NUM_SAVED=0,
                         NUM_SHARE=0,
                         GPT="")
    
    try:
        newContent.save(force_insert=True)
        return newContent.pk
    except Exception as e:
        print(e)
        return -1


def coarr_en(review_en):
    prompt1 = """\
    Evaluate the professionalism of the following restaurant review based on two criteria
    1. including detailed and illustrative description of the flavors, textures, ingredients, cooking techniques, and overall taste experience of the food (score out of 20)
    2. including detailed and illustrative description of the dining experience, service quality, the atmosphere of the restaurant, and the attentiveness of the staff (score out of 10)
    Review:
    """ + review_en

    message1=[{"role": "user", "content": prompt1}]
    response1 = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages = message1,
        temperature=0.2,
        max_tokens=2048,
        frequency_penalty=0.0
    )
    
    prompt2 = """\
    return the article in json format without the overall evaluation
    format:
    {
        "criterion1": {
            "ratings": "0/20",
            "evalutation": "..."
        },
        "criterion2": {
            "ratings": "0/10",
            "evaluation": "..."
        }
    }
    article:
    """ + response1.choices[0].message.content
    
    message2=[{"role": "user", "content": prompt2}]
    response2 = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages = message2,
        temperature=0.2,
        max_tokens=2048,
        frequency_penalty=0.0
    )
    
    return response2.choices[0].message.content


@csrf_exempt
def review_gpt(data, jobject, CID):

    start = time.time()
    
    review_en = ko2en(data)
    eval_en = coarr_en(review_en)
    eval_json = json.loads(eval_en)
    
    # ratings
    eval_json["criterion1"]["ratings"] = int(eval_json["criterion1"]["ratings"][:-3])
    eval_json["criterion2"]["ratings"] = int(eval_json["criterion2"]["ratings"][:-3])
    
    # evaluation
    eval_json["criterion1"]["evaluation"] = en2ko(eval_json["criterion1"]["evaluation"])
    eval_json["criterion2"]["evaluation"] = en2ko(eval_json["criterion2"]["evaluation"])
    
    end = time.time()
    
    print(f"### Took {end - start:.2f} sec ###\n")
    print("### original evaluation in english ###")
    print(eval_en)
    
    save_gpt_review(eval_json, jobject, CID)


def save_gpt_review(eval_json, jobject, CID):
    print(eval_json)
    print(jobject)
    print(CID)

    queryset = Content.objects.filter(CID=CID)
    eval_text = json.dumps(eval_json, ensure_ascii=False)

    if (queryset):
        try:
            bf = Content.objects.get(CID=CID)
            bf.GPT = eval_text
            bf.save()
        except Exception as e:
            print(e)

    else:
        print("NO DATA FOUND in DB")

    return
    



