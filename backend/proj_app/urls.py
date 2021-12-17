from django.urls import path, include
from .views import TaskListViewset, TaskViewset, GoalViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'task-list', TaskListViewset, basename='task-list')
router.register(r'task', TaskViewset, basename='task')
router.register(r'goals', GoalViewset, basename='goal')
urlpatterns = router.urls