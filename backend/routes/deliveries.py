from fastapi import APIRouter, HTTPException, Depends
from pymongo.database import Database
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from backend.db.mongo import get_db
from backend.utils.security import verify_token

router = APIRouter()

# Serializador actualizado con FIX de 'status'
def serialize_delivery(delivery):
    delivery["_id"] = str(delivery["_id"])
    delivery["apartmentId"] = str(delivery.get("apartmentId", ""))
    delivery["status"] = delivery.get("status", "pendiente")  # ✅ FIX agregado aquí
    delivery["receivedDate"] = delivery.get("receivedDate", datetime.utcnow())
    delivery["deliveredDate"] = delivery.get("deliveredDate", None)
    delivery["createdAt"] = delivery.get("createdAt", datetime.utcnow())
    delivery["updatedAt"] = delivery.get("updatedAt", datetime.utcnow())
    return delivery

# Modelos
class DeliveryIn(BaseModel):
    apartmentId: str
    receivedDate: datetime
    deliveredDate: Optional[datetime] = None
    status: str
    description: Optional[str] = ""

class DeliveryOut(DeliveryIn):
    _id: str
    createdAt: datetime
    updatedAt: datetime

# GET /deliveries
@router.get("/", response_model=List[DeliveryOut], dependencies=[Depends(verify_token)])
def get_deliveries(db: Database = Depends(get_db)):
    try:
        deliveries = [serialize_delivery(d) for d in db["deliveries"].find()]
        return deliveries
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener entregas: {str(e)}")

# GET /deliveries/{id}
@router.get("/{id}", response_model=DeliveryOut, dependencies=[Depends(verify_token)])
def get_delivery(id: str, db: Database = Depends(get_db)):
    try:
        delivery = db["deliveries"].find_one({"_id": ObjectId(id)})
        if not delivery:
            raise HTTPException(status_code=404, detail="Entrega no encontrada")
        return serialize_delivery(delivery)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener la entrega: {str(e)}")

# POST /deliveries
@router.post("/", response_model=DeliveryOut, dependencies=[Depends(verify_token)])
def create_delivery(data: DeliveryIn, db: Database = Depends(get_db)):
    try:
        now = datetime.utcnow()
        delivery = data.dict()
        delivery["apartmentId"] = ObjectId(delivery["apartmentId"])
        delivery.update({"createdAt": now, "updatedAt": now})
        result = db["deliveries"].insert_one(delivery)
        new_delivery = db["deliveries"].find_one({"_id": result.inserted_id})
        return serialize_delivery(new_delivery)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear la entrega: {str(e)}")

# PATCH /deliveries/{id}
@router.patch("/{id}", response_model=DeliveryOut, dependencies=[Depends(verify_token)])
def update_delivery(id: str, data: DeliveryIn, db: Database = Depends(get_db)):
    try:
        update_data = {k: v for k, v in data.dict().items() if v is not None}
        if "apartmentId" in update_data:
            update_data["apartmentId"] = ObjectId(update_data["apartmentId"])
        update_data["updatedAt"] = datetime.utcnow()
        result = db["deliveries"].update_one({"_id": ObjectId(id)}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Entrega no encontrada")
        updated = db["deliveries"].find_one({"_id": ObjectId(id)})
        return serialize_delivery(updated)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar la entrega: {str(e)}")

# DELETE /deliveries/{id}
@router.delete("/{id}", dependencies=[Depends(verify_token)])
def delete_delivery(id: str, db: Database = Depends(get_db)):
    try:
        result = db["deliveries"].delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Entrega no encontrada")
        return {"msg": "Entrega eliminada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar la entrega: {str(e)}")