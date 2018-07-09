from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
import json
from datetime import datetime
import uuid
import pymysql.cursors
from .models import User, Group, Paticipation, Section

# Create your views here.

@csrf_exempt
def createUser(request):
  data = json.loads(request.body)
  # print(data)
  # print(type(data))
  userName = data['nick']
  weixinCode = data['code']
  avatarUrl = data['avaurl']
  time = datetime.now()
  print(time)
  user = {
    "UserID" : weixinCode,
    "UserName" : userName,
    "JoinDate" : time
  }
  # 检查用户是否已经存在，已经存在的用户直接登录
  try:
    userInfo = User.objects.get(UserID=weixinCode)
    print(userInfo)
  except ObjectDoesNotExist:
    User.objects.create(**user)

  return HttpResponse(json.dumps(user["UserID"], ensure_ascii=False), content_type="json")


@csrf_exempt
def createGroup(request):
  data = json.loads(request.body)
  print(data)
  print(type(data))
  groupName = data['groupName']
  lord = data['UserName']
  section_tag = data['sectionTag']
  createTime = datetime.now()
  print(str(uuid.uuid1()))
  group = {
    "GroupID" : uuid.uuid1(),
    "GroupName" : groupName,
    "SectionTag" : section_tag,
    "GroupLord" : lord,
    "GroupDate" : createTime
  }
  try:
    Group.objects.create(**group)
    print("successful insert!")
  except Exception:
    print(Exception.with_traceback())
  return HttpResponse(json.dumps(str(group['GroupID']), ensure_ascii=False), content_type="json")

@csrf_exempt
def getGroups(request):
  data = json.loads(request.body)
  # print(data)
  # print(type(data))
  section = data['section_id']
  limit = data['limit'] #限定数量的查询
  groups = Group.objects.filter(section_tag=section)[limit]
  retMsg = {
    "groupNumber" : groups.size()
  }
  groupsInfo = []
  memebers = 10 # 需要查询加入的这张表
  for group in groups:
    groupsInfo.append({
      "groupID" : group["GroupID"],
      "groupName" : group["GroupName"],
      "groupMembers" : memebers
    })
    
  retMsg["groups"] = groupsInfo
  HttpResponse(json.dumps(retMsg), content_type="json")

@csrf_exempt
def hotSections(request):
  # 得到一些主要的分区的名称
  sections = Section.objects.all()
  retMsg = {
    "section_num" : sections.size()
  }
  sectionInfo = []
  for section in sections:
    sectionInfo.append( {
      "sectionID" : section['id'],
      "sectionTag" :section['sectionTag']
    })
  retMsg['sections'] = sectionInfo
  HttpResponse(json.dumps(retMsg), content_type='json')

@csrf_exempt
def getGroup(request):
  try:
    para = request.GET['id']
    group = Group.objects.get(GroupID=para.id)
    print(type(group))
    print(group)
    HttpResponse(json.dumps(group), content_type="json")
  except ObjectDoesNotExist:
    msg = "Not Found Group"
    HttpResponse(msg, content_type="text")
