from django.db import models
from django.conf import settings
from django.utils import timezone

class User(models.Model):
    UID = models.IntegerField()
    EMAIL = models.CharField(max_length=100)
    NAME = models.CharField(max_length=10)
    PASSWORD = models.CharField(max_length=50)
    CREATED = models.DateTimeField(
            default=timezone.now)
    UPDATED = models.DateTimeField(
            default=timezone.now)

    def __str__(self):
        return self.UID


class Content(models.Model):
    CID = models.IntegerField()
    CTYPE = models.CharField(max_length=10)
    WRITER = models.IntegerField()
    APPROVER = models.IntegerField()
    DELETED = models.IntegerField()
    STATUS = models.IntegerField()
    CONTENT = models.TextField()
    NUM_LIKE = models.IntegerField(default=0)
    NUM_SAVED = models.IntegerField(default=0)
    NUM_SHARE = models.IntegerField(default=0)
    CREATED = models.DateTimeField(
            default=timezone.now)
    UPDATED = models.DateTimeField(
            default=timezone.now)

    def __str__(self):
        return self.RID
