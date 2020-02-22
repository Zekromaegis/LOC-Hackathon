from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('PlacementPrediction.urls')),
    path('accounts/', include('django.contrib.auth.urls'))
]

urlpatterns += [
    path('api-auth/',include('rest_framework.urls'))
]
