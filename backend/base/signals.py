from django.db.models.signals import pre_save
from django.contrib.auth.models import User

# this function will be called before saving the user
def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != '':
        user.username = user.email

# connect the pre_save signal with the updateUser function
pre_save.connect(updateUser, sender=User)