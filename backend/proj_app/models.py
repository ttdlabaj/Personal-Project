from django.db import models

class Goal(models.Model):
    name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False) 

    def __str__(self):
        return self.name

class TaskList(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Task(models.Model):
    name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)    
    list = models.ManyToManyField(TaskList, related_name="tasks")
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE, related_name="tasks")

    def __str__(self):
        return self.name