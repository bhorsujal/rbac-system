from rest_framework import generics, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from users.serializers import RoleSerializer
from .models import Role
from .models import Service, RoleService
from .serializers import ServiceSerializer
from .permissions import DynamicRoleBasedAccessPermission


class ServiceListCreateView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated]

class AssignServiceToRoleView(views.APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        role_name = request.data.get('role')
        service_name = request.data.get('service')

        try:
            role = Role.objects.get(name=role_name)
            service = Service.objects.get(name=service_name)
            RoleService.objects.get_or_create(role=role, service=service)
            return Response({'detail': f'Service {service_name} assigned to role {role_name}.'})
        except Role.DoesNotExist:
            return Response({'error': 'Role not found.'}, status=404)
        except Service.DoesNotExist:
            return Response({'error': 'Service not found.'}, status=404)

class ServiceAccessView(views.APIView):
    permission_classes = [IsAuthenticated, DynamicRoleBasedAccessPermission]

    def get(self, request, service_name):
        try:
            service = Service.objects.get(name=service_name)

            service.access_count += 1
            service.save()

            return Response({
                'detail': f"Access granted to {service_name} as {request.user.role.name}."
            })
        except Service.DoesNotExist:
            return Response({'error': 'Service not found.'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

class AccessibleServicesView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_role = request.user.role
        if not user_role:
            return Response({'detail': 'No role assigned to the user.'}, status=400)

        services = Service.objects.filter(roleservice__role=user_role).distinct()
        if not services.exists():
            return Response({'detail': 'No services available for your role.'}, status=404)
        serializer = ServiceSerializer(services, many=True)
        print(serializer.data)
        return Response(serializer.data)


class ServiceAccessCountView(views.APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        services = Service.objects.all()
        data = [
            {
                'name': service.name,
                'description': service.description,
                'access_count': service.access_count
            }
            for service in services
        ]
        return Response(data)

class RoleListView(views.APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)
    
class CheckServiceAccessView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        service_name = request.data.get('service_name')
        user_role = request.user.role

        if not service_name:
            return Response({"error": "Service name is required."}, status=400)

        try:
            service = Service.objects.get(name=service_name)
        except Service.DoesNotExist:
            return Response({"error": "Service not found."}, status=404)

        has_access = RoleService.objects.filter(role=user_role, service=service).exists()

        if has_access:
            return Response({"access": True, "message": f"Access granted to {service_name}."})
        else:
            return Response({"access": False, "message": f"Access denied for {service_name}."})
        
class RoleServicesView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        roles = Role.objects.all()
        data = [
            {
                "id": role.id,
                "name": role.name,
                "services": [
                    {"id": service.id, "name": service.name}
                    for service in role.services.all()
                ],
            }
            for role in roles
        ]

        return Response(data)