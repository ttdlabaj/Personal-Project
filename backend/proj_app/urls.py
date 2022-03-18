from django.urls import path, include
from .views import  TaskViewset, GoalViewset, DailyTaskViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'task', TaskViewset, basename='task')
router.register(r'goals', GoalViewset, basename='goal')
router.register(r'daily-task', DailyTaskViewset, basename='daily-task')
urlpatterns = router.urls