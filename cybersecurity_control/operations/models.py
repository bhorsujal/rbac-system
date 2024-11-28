from django.db import models
from users.models import Role

class Service(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    access_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

class RoleService(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('role', 'service')

    def __str__(self):
        return f"{self.role.name} -> {self.service.name}"
