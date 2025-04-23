# backend/routes/apartments.py

from fastapi import APIRouter, HTTPException, Depends
from pymongo.database import Database
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId
from backend.db.mongo import get_db
from backend.utils.security import verify_token

router = APIRouter()

# Utilidad para convertir ObjectId a string
def serialize_apartment(apartment):
    apartment["_id"] = str(apartment["_id"])
    if "userId" in apartment and apartment["userId"]:
        apartment["userId"] = str(apartment["userId"])
    return apartment

# Pydantic model para entrada
class ApartmentIn(BaseModel):
    number: str
    level: int
    userId: Optional[str] = None

# Modelo para respuesta (extendido)
class ApartmentOut(ApartmentIn):
    _id: str
    createdAt: datetime
    updatedAt: datetime

# GET /apartments — Listar todos
@router.get("/", response_model=List[ApartmentOut], dependencies=[Depends(verify_token)])
def get_apartments(db: Database = Depends(get_db)):
    apartments = list(db["apartments"].find())
    return [serialize_apartment(a) for a in apartments]

# GET /apartments/{id} — Obtener por ID
@router.get("/{id}", response_model=ApartmentOut, dependencies=[Depends(verify_token)])
def get_apartment(id: str, db: Database = Depends(get_db)):
    apartment = db["apartments"].find_one({"_id": ObjectId(id)})
    if not apartment:
        raise HTTPException(status_code=404, detail="Apartamento no encontrado")
    return serialize_apartment(apartment)

# POST /apartments — Crear
@router.post("/", response_model=ApartmentOut, dependencies=[Depends(verify_token)])
def create_apartment(data: ApartmentIn, db: Database = Depends(get_db)):
    now = datetime.utcnow()
    apartment = data.dict()
    apartment.update({"createdAt": now, "updatedAt": now})
    result = db["apartments"].insert_one(apartment)
    apartment["_id"] = str(result.inserted_id)
    apartment["createdAt"] = now
    apartment["updatedAt"] = now
    return apartment

# PATCH /apartments/{id} — Actualizar
@router.patch("/{id}", response_model=ApartmentOut, dependencies=[Depends(verify_token)])
def update_apartment(id: str, data: ApartmentIn, db: Database = Depends(get_db)):
    update_data = {k: v for k, v in data.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.utcnow()
    result = db["apartments"].update_one({"_id": ObjectId(id)}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Apartamento no encontrado")
    return serialize_apartment(db["apartments"].find_one({"_id": ObjectId(id)}))

# DELETE /apartments/{id} — Eliminar
@router.delete("/{id}", dependencies=[Depends(verify_token)])
def delete_apartment(id: str, db: Database = Depends(get_db)):
    result = db["apartments"].delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Apartamento no encontrado")
    return {"msg": "Apartamento eliminado"}