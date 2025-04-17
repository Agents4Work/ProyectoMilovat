"""
Módulo de conexión a MongoDB para la aplicación Milovat.

Este archivo maneja la conexión a la base de datos MongoDB utilizando PyMongo.
"""

import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Obtener la cadena de conexión y el nombre de la base de datos desde las variables de entorno
MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("MONGODB_DB")

# Variable global para almacenar la instancia del cliente de MongoDB
_mongo_client = None
_db = None

def get_mongodb_client():
    """
    Obtiene una instancia del cliente de MongoDB.
    
    Returns:
        MongoClient: Cliente de MongoDB para realizar operaciones en la base de datos.
    """
    global _mongo_client
    
    # Si ya existe una instancia del cliente, la devolvemos
    if _mongo_client is not None:
        return _mongo_client
    
    # De lo contrario, creamos una nueva instancia
    try:
        # Aquí se establece la conexión a MongoDB
        # Puedes personalizar los parámetros de conexión según tus necesidades
        _mongo_client = MongoClient(MONGODB_URI)
        print("Conexión a MongoDB establecida exitosamente")
        return _mongo_client
    except Exception as e:
        print(f"Error al conectar a MongoDB: {e}")
        raise

def get_db():
    """
    Obtiene una instancia de la base de datos.
    
    Returns:
        Database: Instancia de la base de datos.
    """
    global _db
    
    # Si ya existe una instancia de la base de datos, la devolvemos
    if _db is not None:
        return _db
    
    # De lo contrario, obtenemos el cliente y la base de datos
    client = get_mongodb_client()
    _db = client[DB_NAME]
    return _db

def close_mongodb_connection():
    """
    Cierra la conexión con MongoDB.
    """
    global _mongo_client
    
    if _mongo_client is not None:
        _mongo_client.close()
        _mongo_client = None
        print("Conexión a MongoDB cerrada")