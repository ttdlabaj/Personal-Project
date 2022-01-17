from rest_framework import viewsets
from .models import Task, Goal, DailyTask
from .serializers import TaskSerializer, GoalSerializer, DailyTaskSerializer

class GoalViewset(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer

class DailyTaskViewset(viewsets.ModelViewSet):
    queryset = DailyTask.objects.all()
    serializer_class = DailyTaskSerializer 

# class TaskListViewset(viewsets.ModelViewSet):
#     queryset = TaskList.objects.all()
#     serializer_class = TaskListSerializer

class TaskViewset(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

