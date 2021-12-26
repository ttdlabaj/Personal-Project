from rest_framework import serializers
from .models import TaskList, Task, Goal

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ('id', 'name', 'completed', 'tasks', 'created_at')

class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = ('id', 'name', 'description', 'tasks')

class TaskSerializer(serializers.ModelSerializer):
    # list = serializers.SlugRelatedField(
    #     many=True,
    #     read_only=True,
    #     slug_field='name'
    # )
    # goal = serializers.SlugRelatedField(
    #     read_only=True,
    #     slug_field='name'
    # )
    # goal = serializers.StringRelatedField()
    class Meta:
        model = Task
        fields = ('id', 'name', 'completed', 'list', 'goal', 'created_at')

