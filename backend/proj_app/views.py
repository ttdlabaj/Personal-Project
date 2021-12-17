from rest_framework import viewsets
from .models import TaskList, Task, Goal
from .serializers import TaskListSerializer, TaskSerializer, GoalSerializer

class GoalViewset(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

class TaskListViewset(viewsets.ModelViewSet):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer

class TaskViewset(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

