from rest_framework import serializers
from .models import TaskList, Task, Goal

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ('id', 'name', 'completed', 'tasks')

class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = ('id', 'name', 'description', 'tasks')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'name', 'completed', 'list', 'goal')