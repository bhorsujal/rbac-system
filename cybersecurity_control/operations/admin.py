from django.contrib import admin
from .models import Service, RoleService

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(RoleService)
class RoleServiceAdmin(admin.ModelAdmin):
    list_display = ('role', 'service')
    list_filter = ('role', 'service')
    autocomplete_fields = ('role', 'service')