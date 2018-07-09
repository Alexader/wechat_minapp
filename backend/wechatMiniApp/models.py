from django.db import models

# Create your models here.
class User(models.Model):
  UserName = models.CharField(max_length=40)
  UserID = models.CharField(max_length=40)
  JoinDate = models.DateField()

class Group(models.Model):
  GroupID = models.UUIDField()
  GroupName = models.CharField(max_length=40)
  SectionTag = models.CharField(max_length=10)
  GroupLord = models.CharField(max_length=40)
  GroupDate = models.DateField()

class Paticipation(models.Model):
  PaticipationID = models.CharField(max_length=40)
  GroupID = models.CharField(max_length=40)
  UserID = models.CharField(max_length=40)
  PaticipationDate = models.DateField()

class Section(models.Model):
  sectionTag = models.CharField(max_length=10, default="society")
  # sectionID = models.CharField(max_length=10)