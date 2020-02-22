from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render,redirect
from . import templates
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
#from django.http import HttpResponse, JsonResponse
#]from django.views.decorators.csrf import csrf_exempt
#from rest_framework.parsers import JSONParser
from .models import Student
from .serializers import StudentSerializer, UserSerializer, OnlyStudentSerializer
from rest_framework import generics

def index(request):
    return render(request, 'PlacementPrediction/auth.html')

def register(request):
    if request.method=="POST":
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            user=authenticate(form)
            login(request, user)
            return redirect('/')
            
    else:
        form= UserCreationForm()

    context={'form':form}
    return render(request, 'PlacementPrediction/register.html',context)


'''@csrf_exempt
def student_details(request, pk):
    if request.method=='GET':
        students=Student.objects.get(pk=pk)
        serializer=StudentSerializer(students, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=StudentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
    elif request.method=='PUT':
        students=Student.objects.get(pk=pk)
        serializer=StudentSerializer(students, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method=='DELETE':
        students=Student.objects.get(pk=pk)
        students.delete()
        return HttpResponse(status=204)

@csrf_exempt
def student_list(request):
    if request.method=="GET":
        students=Student.objects.all()
        serializer=StudentSerializer(students, many=True)
        return JsonResponse(serializer.data, safe=False)'''

class StudentCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset=Student.objects.all()
    serializer_class=OnlyStudentSerializer
    def perform_create(self, serializer):
       serializer.save(user = self.request.user)

class StudentUpdate(generics.RetrieveUpdateDestroyAPIView):
    serializer_class=OnlyStudentSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self, queryset=None):
        return Student.objects.filter(user=self.request.user)[0]
    def get_queryset(self):
        return Student.objects.filter(user=self.request.user)

class UserCreate(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer

#class UserLogin()

class UserUpdate(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class=UserSerializer
    def get_object(self, queryset=None):
        return self.request.user
    def get_queryset(self):
        return User.objects.filter(user=self.request.user.pk)