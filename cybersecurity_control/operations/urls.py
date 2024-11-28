from django.urls import path
from .views import (
    ServiceListCreateView,
    AssignServiceToRoleView,
    ServiceAccessView,
    AccessibleServicesView,
    ServiceAccessCountView,
    RoleListView,
    CheckServiceAccessView,
    RoleServicesView
)

urlpatterns = [
    path('all-services/', ServiceListCreateView.as_view(), name='service-list'),
    path('assign-service/', AssignServiceToRoleView.as_view(), name='assign-service'),
    path('service/<str:service_name>/', ServiceAccessView.as_view(), name='service-access'),
    path('accessible-services/', AccessibleServicesView.as_view(), name='accessible-services'),
    path('service-access-count/', ServiceAccessCountView.as_view(), name='service-access-count'),
    path('roles/', RoleListView.as_view(), name='role-list'),
    path('check-service-access/', CheckServiceAccessView.as_view(), name='check-service-access'),
    path('role-services/', RoleServicesView.as_view(), name='role-services'),
]
