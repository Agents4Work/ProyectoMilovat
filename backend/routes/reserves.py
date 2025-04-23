from fastapi import APIRouter, HTTPException, Depends
from pymongo.database import Database
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from backend.db.mongo import get_db
from backend.utils.security import verify_token

router = APIRouter()

# Serializador
def serialize_reserve(reserve):
    reserve["_id"] = str(reserve["_id"])
    reserve["apartmentId"] = str(reserve.get("apartmentId", ""))
    reserve["instalacion"] = reserve.get("instalacion", "")
    reserve["fecha"] = reserve.get("fecha", datetime.utcnow())
    reserve["horaInicio"] = reserve.get("horaInicio", "")
    reserve["horaFin"] = reserve.get("horaFin", "")
    reserve["status"] = reserve.get("status", "pending")
    reserve["createdAt"] = reserve.get("createdAt", datetime.utcnow())
    reserve["updatedAt"] = reserve.get("updatedAt", datetime.utcnow())
    return reserve

# Modelos
class ReserveIn(BaseModel):
    apartmentId: str
    instalacion: str
    fecha: datetime
    horaInicio: str
    horaFin: str
    status: Optional[str] = "pending"

class ReserveOut(ReserveIn):
    _id: str
    createdAt: datetime
    updatedAt: datetime

# GET /reserves
@router.get("/", response_model=List[ReserveOut], dependencies=[Depends(verify_token)])
def get_reserves(db: Database = Depends(get_db)):
    try:
        reserves = [serialize_reserve(r) for r in db["reserves"].find()]
        return reserves
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener reservas: {str(e)}")

# GET /reserves/{id}
@router.get("/{id}", response_model=ReserveOut, dependencies=[Depends(verify_token)])
def get_reserve(id: str, db: Database = Depends(get_db)):
    try:
        reserve = db["reserves"].find_one({"_id": ObjectId(id)})
        if not reserve:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        return serialize_reserve(reserve)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener reserva: {str(e)}")

# POST /reserves
@router.post("/", response_model=ReserveOut, dependencies=[Depends(verify_token)])
def create_reserve(data: ReserveIn, db: Database = Depends(get_db)):
    try:
        now = datetime.utcnow()
        reserve = data.dict()
        reserve["apartmentId"] = ObjectId(reserve["apartmentId"])
        reserve.update({"createdAt": now, "updatedAt": now})
        result = db["reserves"].insert_one(reserve)
        new_reserve = db["reserves"].find_one({"_id": result.inserted_id})
        return serialize_reserve(new_reserve)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear reserva: {str(e)}")

# PATCH /reserves/{id}
@router.patch("/{id}", response_model=ReserveOut, dependencies=[Depends(verify_token)])
def update_reserve(id: str, data: ReserveIn, db: Database = Depends(get_db)):
    try:
        update_data = {k: v for k, v in data.dict().items() if v is not None}
        if "apartmentId" in update_data:
            update_data["apartmentId"] = ObjectId(update_data["apartmentId"])
        update_data["updatedAt"] = datetime.utcnow()
        result = db["reserves"].update_one({"_id": ObjectId(id)}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        updated = db["reserves"].find_one({"_id": ObjectId(id)})
        return serialize_reserve(updated)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar reserva: {str(e)}")

# DELETE /reserves/{id}
@router.delete("/{id}", dependencies=[Depends(verify_token)])
def delete_reserve(id: str, db: Database = Depends(get_db)):
    try:
        result = db["reserves"].delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        return {"msg": "Reserva eliminada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar reserva: {str(e)}")