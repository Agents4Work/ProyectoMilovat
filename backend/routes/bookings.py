from fastapi import APIRouter, HTTPException, Depends
from pymongo.database import Database
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from backend.db.mongo import get_db
from backend.utils.security import verify_token

router = APIRouter()

# Serializador corregido
def serialize_booking(booking):
    booking["_id"] = str(booking["_id"])
    booking["userId"] = str(booking.get("userId", "")) if booking.get("userId") else None
    booking["instalacion"] = booking.get("amenity") or booking.get("instalacion", "")
    booking["fechaInicio"] = booking.get("start") or booking.get("fechaInicio")
    booking["fechaFin"] = booking.get("end") or booking.get("fechaFin")
    booking["createdAt"] = booking.get("createdAt", datetime.utcnow())
    booking["updatedAt"] = booking.get("updatedAt", datetime.utcnow())
    return booking

# Modelo de entrada
class BookingIn(BaseModel):
    instalacion: str
    fechaInicio: datetime
    fechaFin: datetime
    userId: Optional[str] = None

# Modelo de salida
class BookingOut(BookingIn):
    _id: str
    createdAt: datetime
    updatedAt: datetime

# GET /bookings — listar todos
@router.get("/", response_model=List[BookingOut], dependencies=[Depends(verify_token)])
def get_bookings(db: Database = Depends(get_db)):
    try:
        bookings_cursor = db["bookings"].find()
        bookings = [serialize_booking(b) for b in bookings_cursor]
        return bookings
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener reservas: {str(e)}")

# GET /bookings/{id} — por ID
@router.get("/{id}", response_model=BookingOut, dependencies=[Depends(verify_token)])
def get_booking(id: str, db: Database = Depends(get_db)):
    try:
        booking = db["bookings"].find_one({"_id": ObjectId(id)})
        if not booking:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        return serialize_booking(booking)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener la reserva: {str(e)}")

# POST /bookings — nueva reserva
@router.post("/", response_model=BookingOut, dependencies=[Depends(verify_token)])
def create_booking(data: BookingIn, db: Database = Depends(get_db)):
    try:
        now = datetime.utcnow()
        booking = data.dict()
        booking.update({
            "createdAt": now,
            "updatedAt": now
        })
        result = db["bookings"].insert_one(booking)
        booking["_id"] = str(result.inserted_id)
        return booking
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear la reserva: {str(e)}")

# PATCH /bookings/{id} — actualizar reserva
@router.patch("/{id}", response_model=BookingOut, dependencies=[Depends(verify_token)])
def update_booking(id: str, data: BookingIn, db: Database = Depends(get_db)):
    try:
        update_data = {k: v for k, v in data.dict().items() if v is not None}
        update_data["updatedAt"] = datetime.utcnow()
        result = db["bookings"].update_one({"_id": ObjectId(id)}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        updated = db["bookings"].find_one({"_id": ObjectId(id)})
        return serialize_booking(updated)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar la reserva: {str(e)}")

# DELETE /bookings/{id}
@router.delete("/{id}", dependencies=[Depends(verify_token)])
def delete_booking(id: str, db: Database = Depends(get_db)):
    try:
        result = db["bookings"].delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        return {"msg": "Reserva eliminada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar la reserva: {str(e)}")