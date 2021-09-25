from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import viewsets
from rest_framework.views import APIView

from .serializers import ClientTextSerializer
from .models import ClientText


class ClientTextViewSet(viewsets.ModelViewSet):
    queryset = ClientText.objects.all().order_by('text')
    serializer_class = ClientTextSerializer