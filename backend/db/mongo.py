# backend/db/mongo.py

from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os

# Cargar variables del archivo .env
load_dotenv()

# Obtener la URI desde la variable de entorno
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "residencial_db"  

if not MONGO_URI:
    raise ValueError("❌ La variable de entorno MONGO_URI no está definida en el archivo .env")

def get_db():
    try:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        print(f"✅ Conexión exitosa a MongoDB [{DB_NAME}]")
        return db
    except ConnectionFailure as e:
        print(f"❌ Error de conexión a MongoDB: {e}")
        raise