from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

RESEARCH=(
        (1,'Yes'),
        (0,'No'),
    )
GENDER=(
        (1,'Male'),
        (0,'Female'),
    )
DEV=(
    (0,'Web'),
    (1,'App'),
    (2,'Software'),
    (3,'ML'),
)

class Student(models.Model):
    user=models.OneToOneField(User, related_name='user', null=True, blank=True, on_delete=models.CASCADE)
    name=models.CharField(max_length=250)
    cgpa=models.FloatField()
    marks12=models.FloatField(max_length=250)
    marks10=models.FloatField(max_length=250)
    hack=models.IntegerField()
    internship=models.IntegerField()
    research_exp=models.IntegerField(choices=RESEARCH)
    gender=models.IntegerField(choices=GENDER)
    dev_type=models.IntegerField(choices=DEV)
    
    AcolliteP = models.FloatField(null=True,blank=True)
    AmazonP = models.FloatField(null=True,blank=True)
    GrofersP = models.FloatField(null=True,blank=True)
    HapticP = models.FloatField(null=True,blank=True)
    MicrosoftP = models.FloatField(null=True,blank=True)
    MorganStanleyP = models.FloatField(null=True,blank=True)
    OracleP = models.FloatField(null=True,blank=True)
    QuantifyP = models.FloatField(null=True,blank=True)
    TCSP = models.FloatField(null=True,blank=True)
    ValveP = models.FloatField(null=True,blank=True)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)