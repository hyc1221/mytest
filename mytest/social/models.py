from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

# Create your models here.
class UserProfile(models.Model):

    user = models.OneToOneField(User, blank=True, null=True, on_delete=models.CASCADE, related_name="profile")
    first_name = models.CharField("First name", max_length=255, blank=True, null=True)
    last_name = models.CharField("Last name", max_length=255, blank=True, null=True)
    description = models.TextField('Description', blank=True, null=True)
    last_time = models.DateTimeField("Last time", auto_now_add=True)
    created_at=models.DateTimeField("Created at", auto_now_add=True)

    def __str__(self):
        return self.user.username
    