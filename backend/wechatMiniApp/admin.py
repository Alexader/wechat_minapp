from django.contrib import admin
from wechatMiniApp import models
# Register your models here.

admin.register(models.User)
admin.register(models.Group)
admin.register(models.Paticipation)