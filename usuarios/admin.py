from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario

@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    list_display = ('correo', 'nombre', 'apellido', 'rol', 'activo', 'fecha_registro')
    list_filter = ('rol', 'activo', 'bloqueado')
    search_fields = ('correo', 'nombre', 'apellido')
    ordering = ('-fecha_registro',)
    fieldsets = (
        (None, {'fields': ('correo', 'password')}),
        ('Datos personales', {'fields': ('nombre', 'apellido', 'rol')}),
        ('Estado', {'fields': ('activo', 'bloqueado', 'intentos_fallidos')}),
        ('Permisos', {'fields': ('is_staff', 'is_superuser', 'groups')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('correo', 'nombre', 'apellido', 'rol', 'password1', 'password2'),
        }),
    )

