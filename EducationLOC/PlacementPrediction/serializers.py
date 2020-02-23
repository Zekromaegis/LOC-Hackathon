from .models import Student, RESEARCH, GENDER
from rest_framework import serializers
from django.contrib.auth.models import User
import pickle
import pandas as pd
import numpy as np

with open('PlacementPrediction/svc1.pickle','rb') as file:
    model = pickle.load(file)
with open('PlacementPrediction/x_transformer.pickle','rb') as file:
    x_transformer = pickle.load(file)

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

class OnlyStudentSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        df = pd.DataFrame()
        df = pd.DataFrame(np.array([
            [validated_data.get('cgpa')],
            [validated_data.get('marks10')],
            [validated_data.get('marks12')],
            [validated_data.get('hack')],
            [validated_data.get('internship')],
            [validated_data.get('research_exp')],
            [validated_data.get('gender')],
            [validated_data.get('dev_type')],
        ]).reshape((1,-1)).astype(np.float),
        columns=['cgpa','Marks10','Marks12','Hack','Intern','Research','gender','devtype'],
        )
        print(validated_data)
        x = x_transformer.transform(X=df)
        ypred = model.predict_proba(x)[0]
        data = validated_data
        data['AcolliteP'] = ypred[0]
        data['AmazonP'] = ypred[1]
        data['GrofersP'] = ypred[2]
        data['HapticP'] = ypred[3]
        data['MicrosoftP'] = ypred[4]
        data['MorganStanleyP'] = ypred[5]
        data['OracleP'] = ypred[6]
        data['QuantifyP'] = ypred[7]
        data['TCSP'] = ypred[8]
        data['ValveP'] = ypred[9]
        return Student.objects.create(**data)
    class Meta:
        model = Student
        exclude = ['user','AcolliteP', 'AmazonP', 'GrofersP', 'HapticP', 'MicrosoftP',
       'MorganStanleyP', 'OracleP', 'QuantifyP', 'TCSP', 'ValveP']

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