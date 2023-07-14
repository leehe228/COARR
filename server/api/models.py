from django.db import models
from django.conf import settings
from django.utils import timezone

class User(models.Model):
    UID = models.AutoField(primary_key=True)
    EMAIL = models.CharField(max_length=100)
    NAME = models.CharField(max_length=10)
    PASSWORD = models.CharField(max_length=50)
    LIKES = models.TextField(blank=True)
    SAVED = models.TextField(blank=True)
    FOLLOWING = models.TextField(blank=True)
    CREATED = models.DateTimeField(
            default=timezone.now)
    UPDATED = models.DateTimeField(
            default=timezone.now)

    def __str__(self):
        return self.UID

class Restaurant(models.Model):
    RID = models.AutoField(primary_key=True)
    STATUS = models.IntegerField(default=0)
    NAME = models.CharField(max_length=30)
    CONTENT = models.TextField(blank=True)
    REVIEWS = models.TextField(blank=True)

    def __str__(self):
        return self.RID
    


class Content(models.Model):
    CID = models.AutoField(primary_key=True)
    CTYPE = models.CharField(max_length=10)
    WRITER = models.IntegerField()
    APPROVER = models.IntegerField()
    DELETED = models.IntegerField()
    STATUS = models.IntegerField()
    CONTENT = models.TextField(blank=True)
    NUM_LIKE = models.IntegerField(default=0)
    NUM_SAVED = models.IntegerField(default=0)
    NUM_SHARE = models.IntegerField(default=0)
    GPT = models.TextField(blank=True)
    CREATED = models.DateTimeField(
            default=timezone.now)
    UPDATED = models.DateTimeField(
            default=timezone.now)

    def __str__(self):
        return self.CID
