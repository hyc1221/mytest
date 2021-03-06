from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
class User(models.Model):

    class Genders(models.TextChoices):
        MALE = 'M', _('Male')
        FEMALE = 'F', _('Female') 
    
    class Status(models.TextChoices):
        ONLINE = 'ON', _('Online')
        OFFLINE = 'OFF', _('Offline')

    first_name = models.CharField("First name", max_length=255)
    last_name = models.CharField("Last name", max_length=255)
    birth_date = models.DateField("Birth date")
    gender = models.CharField("Gender", max_length=1, choices=Genders.choices)
    description = models.TextField('Description', blank=True, null=True)
    status = models.CharField("Status", max_length=3, choices=Status.choices, default=Status.OFFLINE)
    last_time = models.DateTimeField("Last time", auto_now_add=True)
    