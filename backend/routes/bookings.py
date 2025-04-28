from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from pymongo.database import Database
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from backend.db.mongo import get_db
from backend.utils.security import verify_token

router = APIRouter()

# ✅ Serializador actualizado
def serialize_booking(booking):
    try:
        booking["_id"] = str(booking["_id"])
        booking["userId"] = str(booking.get("userId", "")) if booking.get("userId") else None
        booking["instalacion"] = booking.get("instalacion", "")

        fecha_inicio = booking.get("fechaInicio")
        if isinstance(fecha_inicio, str):
            fecha_inicio = datetime.fromisoformat(fecha_inicio)
        elif not isinstance(fecha_inicio, datetime):
            fecha_inicio = datetime.utcnow()

        fecha_fin = booking.get("fechaFin")
        if isinstance(fecha_fin, str):
            fecha_fin = datetime.fromisoformat(fecha_fin)
        elif not isinstance(fecha_fin, datetime):
            fecha_fin = datetime.utcnow()

        booking["fechaInicio"] = fecha_inicio
        booking["fechaFin"] = fecha_fin
        booking["createdAt"] = booking.get("createdAt", datetime.utcnow())
        booking["updatedAt"] = booking.get("updatedAt", datetime.utcnow())
        return booking
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al serializar reserva: {str(e)}")

# ✅ Modelos
class BookingIn(BaseModel):
    instalacion: str
    fechaInicio: datetime
    fechaFin: datetime
    userId: Optional[str] = None

class BookingOut(BookingIn):
    _id: str
    createdAt: datetime
    updatedAt: datetime

# ✅ NUEVO modelo para horarios
class HorarioOcupado(BaseModel):
    inicio: int
    fin: int

# ✅ GET /bookings
@router.get("/", response_model=List[BookingOut], dependencies=[Depends(verify_token)])
def get_bookings(db: Database = Depends(get_db)):
    try:
        bookings_cursor = db["bookings"].find()
        bookings = [serialize_booking(b) for b in bookings_cursor]
        return bookings
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener reservas: {str(e)}")

# ✅ GET /bookings/{id}
@router.get("/{id}", response_model=BookingOut, dependencies=[Depends(verify_token)])
def get_booking(id: str, db: Database = Depends(get_db)):
    try:
        booking = db["bookings"].find_one({"_id": ObjectId(id)})
        if not booking:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        return serialize_booking(booking)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener la reserva: {str(e)}")

# ✅ POST /bookings
@router.post("/", response_model=BookingOut, dependencies=[Depends(verify_token)])
def create_booking(data: BookingIn, db: Database = Depends(get_db)):
    try:
        conflict = db["bookings"].find_one({
            "instalacion": data.instalacion,
            "$or": [
                {
                    "fechaInicio": {"$lt": data.fechaFin},
                    "fechaFin": {"$gt": data.fechaInicio}
                }
            ]
        })
        if conflict:
            raise HTTPException(status_code=409, detail="Conflicto: ya existe una reserva en ese horario.")

        now = datetime.utcnow()
        booking = data.dict()
        booking.update({
            "createdAt": now,
            "updatedAt": now
        })
        result = db["bookings"].insert_one(booking)
        booking["_id"] = str(result.inserted_id)
        return serialize_booking(booking)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear la reserva: {str(e)}")

# ✅ PATCH /bookings/{id}
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

# ✅ DELETE /bookings/{id}
@router.delete("/{id}", dependencies=[Depends(verify_token)])
def delete_booking(id: str, db: Database = Depends(get_db)):
    try:
        result = db["bookings"].delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Reserva no encontrada")
        return {"msg": "Reserva eliminada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar la reserva: {str(e)}")

# ✅ GET /bookings/horarios
@router.get("/horarios", response_model=List[HorarioOcupado], dependencies=[Depends(verify_token)])
def get_disponibilidad(instalacion: str, fecha: str, db: Database = Depends(get_db)):
    try:
        dia_inicio = datetime.fromisoformat(fecha)
        dia_fin = dia_inicio.replace(hour=23, minute=59, second=59)

        reservas = list(db["bookings"].find({
            "instalacion": instalacion,
            "fechaInicio": {"$gte": dia_inicio, "$lte": dia_fin}
        }))

        ocupados = []
        for r in reservas:
            fecha_inicio = r.get("fechaInicio")
            fecha_fin = r.get("fechaFin")

            if not fecha_inicio or not fecha_fin:
                continue

            if isinstance(fecha_inicio, str):
                fecha_inicio = datetime.fromisoformat(fecha_inicio)
            if isinstance(fecha_fin, str):
                fecha_fin = datetime.fromisoformat(fecha_fin)

            ocupados.append({
                "inicio": fecha_inicio.hour,
                "fin": fecha_fin.hour
            })

        return ocupados
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener horarios: {str(e)}")