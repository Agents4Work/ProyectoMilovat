"""
Script para probar la conexión a MongoDB.

Este script intenta conectarse a MongoDB usando la configuración en el archivo .env
y muestra un mensaje indicando si la conexión fue exitosa.
"""

from db_connection import get_mongodb_client, close_mongodb_connection

def test_mongodb_connection():
    """
    Prueba la conexión a MongoDB y muestra el resultado.
    """
    try:
        # Intentar obtener el cliente de MongoDB
        client = get_mongodb_client()
        
        # Probar la conexión con el servidor
        server_info = client.server_info()
        
        # Si llegamos aquí, la conexión fue exitosa
        print("✓ Conexión a MongoDB exitosa!")
        print(f"Versión del servidor: {server_info.get('version', 'Desconocida')}")
        
        # Listar las bases de datos disponibles
        database_names = client.list_database_names()
        print(f"Bases de datos disponibles: {', '.join(database_names)}")
        
        return True
    except Exception as e:
        # Si ocurre un error, mostrar un mensaje
        print(f"✗ Error al conectar a MongoDB: {e}")
        return False
    finally:
        # Cerrar la conexión
        close_mongodb_connection()

if __name__ == "__main__":
    # Ejecutar la prueba de conexión
    test_mongodb_connection()