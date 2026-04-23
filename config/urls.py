from django.contrib import admin
from django.urls import path, include # Asegúrate de que 'include' esté aquí

urlpatterns = [
    path('admin/', admin.site.urls),
    # Esto conecta las rutas de tu app 'usuarios'
    path('', include('usuarios.urls')), 
]
