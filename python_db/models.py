"""
Módulo de modelos para la aplicación Milovat.

Define las estruturas de datos y funciones de acceso para las colecciones
de MongoDB utilizadas en la aplicación.
"""

from datetime import datetime
from bson import ObjectId
from db_connection import get_db

# Nombres de las colecciones
USERS_COLLECTION = "users"
BUILDINGS_COLLECTION = "buildings"
APARTMENTS_COLLECTION = "apartments"
RESERVATIONS_COLLECTION = "reservations"
VISITS_COLLECTION = "visits"
FINES_COLLECTION = "fines"
PAYMENTS_COLLECTION = "payments"

# Funciones de acceso a datos para cada colección
# Cada función usa get_db() para obtener la instancia de la base de datos

# === USUARIOS ===
def get_users_collection():
    """
    Obtiene la colección de usuarios.
    
    Returns:
        Collection: Colección de usuarios.
    """
    db = get_db()
    return db[USERS_COLLECTION]

# Coloca aquí tus funciones CRUD para usuarios
# Por ejemplo: create_user, get_user_by_id, update_user, delete_user, etc.

# === EDIFICIOS ===
def get_buildings_collection():
    """
    Obtiene la colección de edificios.
    
    Returns:
        Collection: Colección de edificios.
    """
    db = get_db()
    return db[BUILDINGS_COLLECTION]

# Coloca aquí tus funciones CRUD para edificios

# === DEPARTAMENTOS ===
def get_apartments_collection():
    """
    Obtiene la colección de departamentos.
    
    Returns:
        Collection: Colección de departamentos.
    """
    db = get_db()
    return db[APARTMENTS_COLLECTION]

# Coloca aquí tus funciones CRUD para departamentos

# === RESERVAS ===
def get_reservations_collection():
    """
    Obtiene la colección de reservas.
    
    Returns:
        Collection: Colección de reservas.
    """
    db = get_db()
    return db[RESERVATIONS_COLLECTION]

# Coloca aquí tus funciones CRUD para reservas

# === VISITAS ===
def get_visits_collection():
    """
    Obtiene la colección de visitas.
    
    Returns:
        Collection: Colección de visitas.
    """
    db = get_db()
    return db[VISITS_COLLECTION]

# Coloca aquí tus funciones CRUD para visitas

# === MULTAS ===
def get_fines_collection():
    """
    Obtiene la colección de multas.
    
    Returns:
        Collection: Colección de multas.
    """
    db = get_db()
    return db[FINES_COLLECTION]

# Coloca aquí tus funciones CRUD para multas

# === PAGOS ===
def get_payments_collection():
    """
    Obtiene la colección de pagos.
    
    Returns:
        Collection: Colección de pagos.
    """
    db = get_db()
    return db[PAYMENTS_COLLECTION]

# Coloca aquí tus funciones CRUD para pagos