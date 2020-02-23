from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, redirect
from . import templates
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import Student
from .serializers import StudentSerializer, UserSerializer, OnlyStudentSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
import pickle
import pandas as pd
import numpy as np

st_df = pd.read_csv('PlacementPrediction/student.csv')


class a(APIView):
    def get(self, request, **kwargs):
        v = st_df[st_df['company'] == kwargs['company']]  # .to_dict('records')
        ans = {}
        for i in v.columns:
            ans[i] = v[i].unique()
        return Response(ans)


with open('PlacementPrediction/svc1.pickle', 'rb') as file:
    model = pickle.load(file)
with open('PlacementPrediction/x_transformer.pickle', 'rb') as file:
    x_transformer = pickle.load(file)


def index(request):
    return render(request, 'PlacementPrediction/auth.html')


def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)

        if form.is_valid():
            form.save()
            user = authenticate(form)
            login(request, user)
            return redirect('/')

    else:
        form = UserCreationForm()

    context = {'form': form}
    return render(request, 'PlacementPrediction/register.html', context)


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
    queryset = Student.objects.all()
    serializer_class = OnlyStudentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class StudentUpdate(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OnlyStudentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self, queryset=None):
        return Student.objects.filter(user=self.request.user)[0]

    def get_queryset(self):
        return Student.objects.filter(user=self.request.user)

    def put(self, request, format=None):
        obj = self.get_object()
        df = pd.DataFrame()
        df = pd.DataFrame(np.array([
            [request.data.get('cgpa')],
            [request.data.get('marks10')],
            [request.data.get('marks12')],
            [request.data.get('hack')],
            [request.data.get('internship')],
            [request.data.get('research_exp')],
            [request.data.get('gender')],
            [request.data.get('dev_type')],
        ]).reshape((1, -1)).astype(np.float),
            columns=['cgpa', 'Marks10', 'Marks12', 'Hack',
                     'Intern', 'Research', 'gender', 'devtype'],
        )
        print(df)
        x = x_transformer.transform(X=df)
        ypred = model.predict_proba(x)[0]
        data = request.data.copy()
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
        serializer = OnlyStudentSerializer(obj, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class UserLogin()


class UserUpdate(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self, queryset=None):
        return self.request.user

    def get_queryset(self):
        return User.objects.filter(user=self.request.user.pk)


class getCompanyTop(generics.ListAPIView):
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
    # def filter_queryset(self, queryset):
    #   return super().filter_queryset(queryset)

    def get_queryset(self):
        print(len(Student.objects.all()))
        if(len(Student.objects.all()) > self.kwargs['x']):
            return Student.objects.order_by('-'+self.kwargs['company']+'P')[0:self.kwargs['x']]
        return Student.objects.order_by('-'+self.kwargs['company']+'P')


class Get_suggestions(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, **kwargs):
        answer = {}
        company = kwargs['company']
        check_vals = [
            ['Microsoft', 9.4, 0.2, 400, 100, 500, 100,
                3, 1, 2, 0.3, 0.7, 0.5, 0.1, 0.1, 0.7],
            ['Quantify', 8, 0.6, 400, 50, 500, 50, 1,
                0.4, 2, 0.5, 0.3, 0.3, 0.7, 0.2, 0.05],
            ['TCS', 8, 1, 300, 150, 450, 150, 1,
                0.1, 1, 1, 0.2, 0.5, 0.4, 0.2, 0.19],
            ['Acollite', 9, 0.2, 370, 89, 370, 100, 2,
                0.8, 2, 0.2, 0.4, 0.3, 0.1, 0.1, 0.75],
            ['MorganStanley', 9, 0.1, 450, 50, 550, 50,
                4, 1, 3, 0.5, 0.4, 0.4, 0.2, 0.1, 0.65],
            #['JP Morgan',9.3,.3,400,50,500,75,3.5,.75,3,2,0.4,0.4, 0.25,0.25,0.25],
            #['Adobe',8.4,1,400,40,500,60,2,2,2,2,0.7,0.35, 0.1,0.3,0.5],
            ['Valve', 9, 1, 420, 60, 500, 50, 2, 0.1,
                5, 2, 0.8, 0.29, 0.05, 0.15, 0.6],
            #['Google',9.4,0.4,400,100,550,50,3,0.2,2,1,0.6,0.5, 0.2,0.1,0.4],
            ['Oracle', 8.4, 0.4, 400, 50, 450, 90, 2,
                0.2, 1, 0.5, 0.9, 0.5, 0.05, 0.05, 0.85],
            ['Haptic', 9, 0.23, 350, 100, 450, 70, 2,
                0.3, 1, 0.5, 0.2, 0.4, 0.25, 0.25, 0.25],
            #['Infosys',8.2,.9,380,80,470,70,1,0.6,1,1,0.5,0.55, 0.33,0.33,0.27],
            ['Grofers', 8, 0.7, 420, 80, 500, 50, 2,
                0.4, 2, 1, 0.5, 0.55, 0.1, 0.8, 0.05],
            #['Flipkart',9.1,0.3,324,141,500,60,3,0.1,1,0.5,0.2,0.5, 0.4, 0.05, 0.4],
            ['Amazon', 9.4, 0.4, 460, 40, 500, 70, 2,
                1, 3, 0.1, 0.2, 0.3, 0.2, 0.1, 0.5],
        ]
        ans_val = None
        for i in check_vals:
            if(i[0] == company):
                ans_val = i
                break
        if ans_val == None:
            return Response({"Incorrect Company"})
        else:
            st = Student.objects.filter(user=self.request.user.pk)[0]
            if st.cgpa <= ans_val[1] - ans_val[2]:
                answer['Statement1'] = f"You need to improve your CGPA by atleast {ans_val[1] - st.cgpa}"
            elif st.cgpa >= ans_val[1] + ans_val[2]:
                answer['Statement1'] = f"Your CGPA exceeds the requirements."
            else:
                answer['Statement1'] = f"Your CGPA is within the requirements."

            if st.hack <= ans_val[7] - ans_val[8]:
                answer['Statement2'] = f"You need to participate in atleast {ans_val[7] - st.hack} more Hackathons."
            elif st.cgpa >= ans_val[7] + ans_val[8]:
                answer['Statement2'] = f"Your number of Hackathons exceeds the requirements. Keep up the good work!"
            else:
                answer['Statement2'] = f"Your number of Hackathons is within the requirements."

            if st.internship <= ans_val[9] - ans_val[10]:
                answer['Statement3'] = f"You need to take atleast {ans_val[9] - st.internship} more internships. They are important for experience."
            elif st.internship >= ans_val[9] + ans_val[10]:
                answer['Statement3'] = f"Your internship experience is well above the requirements."
            else:
                answer['Statement3'] = f"Your internship experience matches the requirements."

            return Response(answer)
