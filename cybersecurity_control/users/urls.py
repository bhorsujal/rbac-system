from django.urls import path
from .views import RegisterView, LoginView, SwitchUserRoleView, UserListView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('switch-role/', SwitchUserRoleView.as_view(), name='switch-role'),
    path('all-users/', UserListView.as_view(), name='user-list'),
]
