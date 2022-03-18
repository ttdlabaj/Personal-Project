from django.db import models

class Goal(models.Model):
    name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True) 

    def __str__(self):
        return self.name

class DailyTask(models.Model):
    name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True) 

    def __str__(self):
        return self.name

class Task(models.Model):
    name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)    
    # list = models.ManyToManyField(TaskList, related_name="tasks")
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE, related_name="tasks", blank=True)
    dailyTask = models.ForeignKey(DailyTask, on_delete=models.CASCADE, related_name="tasks", null=True, blank=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name