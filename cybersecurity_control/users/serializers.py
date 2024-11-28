from rest_framework import serializers
from .models import Role, User

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name', 'description']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.CharField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role']

    def validate_role(self, value):
        try:
            role = Role.objects.get(name=value)
            return role
        except Role.DoesNotExist:
            raise serializers.ValidationError("Role does not exist.")

    def create(self, validated_data):
        role = validated_data.pop('role')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            role=role
        )
        return user

class UserSerializer(serializers.ModelSerializer):
    role = RoleSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']
