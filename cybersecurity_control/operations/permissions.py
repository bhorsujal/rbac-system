from rest_framework.permissions import BasePermission
from operations.models import RoleService

class DynamicRoleBasedAccessPermission(BasePermission):
    def has_permission(self, request, view):
        service_name = view.kwargs.get('service_name')
        user_role = request.user.role

        if not user_role:
            return False

        return RoleService.objects.filter(role=user_role, service__name=service_name).exists()
