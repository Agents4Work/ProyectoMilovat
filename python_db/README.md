# Conexión a MongoDB para Milovat

Este directorio contiene los archivos necesarios para conectar la aplicación Milovat con una base de datos MongoDB utilizando Python.

## Estructura de archivos

- `.env`: Archivo de variables de entorno (incluye la cadena de conexión a MongoDB)
- `db_connection.py`: Módulo para establecer y gestionar la conexión a MongoDB
- `models.py`: Definición de modelos y funciones de acceso a datos
- `test_connection.py`: Script para probar la conexión a la base de datos
- `api_server.py`: Servidor API Flask (comentado) para integrar con el frontend

## Configuración

1. Actualiza el archivo `.env` con tu cadena de conexión de MongoDB:
   ```
   MONGODB_URI=mongodb+srv://tu_usuario:tu_password@tu_cluster.mongodb.net/tu_db?retryWrites=true&w=majority
   MONGODB_DB=milovat_db
   ```

2. Instala las dependencias necesarias:
   ```bash
   pip install pymongo python-dotenv
   ```

3. Para usar el servidor API, también necesitarás:
   ```bash
   pip install flask flask-cors
   ```

## Prueba de conexión

Para probar que la conexión a MongoDB funciona correctamente:

```bash
python test_connection.py
```

## Integración con la aplicación Node.js existente

Para integrar este módulo de Python con la aplicación Node.js existente, hay varias opciones:

1. **API independiente**: Ejecutar el servidor Flask como un servicio separado y hacer peticiones desde el frontend.

2. **Integración mediante un proceso hijo**: Llamar a los scripts de Python desde Node.js usando `child_process.spawn` o `child_process.exec`.

3. **Microservicios**: Refactorizar la aplicación para usar una arquitectura de microservicios donde la parte Python maneja operaciones específicas.

## Colecciones de MongoDB

El archivo `models.py` define acceso a las siguientes colecciones:

- `users`: Usuarios del sistema
- `buildings`: Edificios gestionados
- `apartments`: Departamentos dentro de los edificios
- `reservations`: Reservas de amenidades
- `visits`: Registro de visitas
- `fines`: Multas asignadas
- `payments`: Registro de pagos

Cada colección tiene funciones asociadas para operaciones CRUD que puedes implementar según tus necesidades.