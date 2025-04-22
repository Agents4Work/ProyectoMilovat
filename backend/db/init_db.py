# init_db.py
from mongo import get_db
from datetime import datetime

db = get_db()

# Colecciones y sus datos dummy
collections = {
    "users": {
        "firstName": "Carlos",
        "lastName": "Martínez",
        "email": "carlos@mail.com",
        "password": "hashed_pw",
        "role": "admin",
        "phone": "555-1234",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    "apartments": {
        "level": 2,
        "number": "2B",
        "userId": None,
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    "payments": {
        "apartmentId": None,
        "amount": 1200.00,
        "concept": "Mantenimiento mensual",
        "dueDate": datetime(2025, 4, 30),
        "status": "pending",
        "paymentDate": datetime(2025, 4, 2),
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    "incidents": {
        "userId": None,
        "title": "Fuga en baño",
        "description": "Fuga en lavamanos",
        "status": "open",
        "priority": "high",
        "category": "plumbing",
        "createdAt": datetime.utcnow(),
        "updatedAt": datetime.utcnow()
    },
    # Agrega el resto si quieres aquí mismo o en un seeder aparte
}

def seed_collections():
    for col_name, doc in collections.items():
        print(f"Inserting into {col_name}...")
        db[col_name].insert_one(doc)
    print("✅ Todas las colecciones fueron inicializadas.")

if __name__ == "__main__":
    seed_collections()