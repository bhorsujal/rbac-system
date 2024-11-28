from rest_framework import generics, views
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .models import Role, User
from .serializers import RoleSerializer, RegisterSerializer, UserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'detail': 'Username and password are required.'}, status=400)

        user = authenticate(username=username, password=password)
        if user:
            if not user.is_active:
                return Response({'detail': 'User account is disabled.'}, status=403)

            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        return Response({'detail': 'Invalid credentials.'}, status=401)


class SwitchUserRoleView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        username = request.data.get('username')
        new_role_name = request.data.get('role')

        try:
            user = User.objects.get(username=username)
            new_role = Role.objects.get(name=new_role_name)

            user.role = new_role
            user.save()

            return Response({'detail': f"Role of user '{username}' switched to '{new_role_name}'."})
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=404)
        except Role.DoesNotExist:
            return Response({'error': 'Role not found.'}, status=404)
        
class UserListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role.name not in ["Manager", "Administrator"]:
            return Response({"error": "Access denied."}, status=403)

        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)