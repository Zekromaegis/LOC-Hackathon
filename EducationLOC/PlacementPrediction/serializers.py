from .models import Student, RESEARCH, GENDER
from rest_framework import serializers
from django.contrib.auth.models import User

'''class StudentSerializer(serializers.Serializer):
    name=serializers.CharField(max_length=250)
    company=serializers.CharField(max_length=250)
    marks12=serializers.CharField(max_length=250)
    marks10=serializers.CharField(max_length=250)
    cgpa=serializers.FloatField()
    hackathons=serializers.IntegerField()
    internship=serializers.IntegerField()
    research=serializers.IntegerField(choices=RESEARCH, default='1')
    gender=serializers.CharField(choices=GENDER, default='M')'''

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        return super().update(instance, validated_data)

    class Meta:
        model=User
        fields=['username','password']

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = UserSerializer(data=user_data)
        if user.is_valid():
            u = user.save()
        obj = Student.objects.create(user=u,**validated_data)
        #User.objects.create(user=obj,**user_data)
        return obj

    class Meta:
        model = Student
        fields = '__all__'