from rest_framework import serializers
from .models import Task, Goal, DailyTask

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ('id', 'name', 'completed', 'tasks', 'created_at')

class DailyTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyTask
        fields = ('id', 'name', 'completed', 'tasks', 'created_at')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'name', 'completed', 'goal', 'dailyTask', 'created_at')

