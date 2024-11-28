from django.contrib import admin
from .models import Role, User

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'role')
    search_fields = ('username', 'email')
    list_filter = ('role',)
