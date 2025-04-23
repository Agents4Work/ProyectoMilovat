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
def serialize_payment(payment):
    payment["_id"] = str(payment["_id"])
    payment["apartmentId"] = str(payment.get("apartmentId", ""))
    payment["status"] = payment.get("status", "pending")
    payment["concept"] = payment.get("concept", "")
    payment["amount"] = float(payment.get("amount", 0))
    payment["dueDate"] = payment.get("dueDate", datetime.utcnow())
    payment["paymentDate"] = payment.get("paymentDate", None)
    payment["createdAt"] = payment.get("createdAt", datetime.utcnow())
    payment["updatedAt"] = payment.get("updatedAt", datetime.utcnow())
    return payment

# Modelos
class PaymentIn(BaseModel):
    apartmentId: str
    amount: float
    concept: str
    dueDate: datetime
    status: Optional[str] = "pending"
    paymentDate: Optional[datetime] = None

class PaymentOut(PaymentIn):
    _id: str
    createdAt: datetime
    updatedAt: datetime

# GET /payments
@router.get("/", response_model=List[PaymentOut], dependencies=[Depends(verify_token)])
def get_payments(db: Database = Depends(get_db)):
    try:
        payments = [serialize_payment(p) for p in db["payments"].find()]
        return payments
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener pagos: {str(e)}")

# GET /payments/{id}
@router.get("/{id}", response_model=PaymentOut, dependencies=[Depends(verify_token)])
def get_payment(id: str, db: Database = Depends(get_db)):
    try:
        payment = db["payments"].find_one({"_id": ObjectId(id)})
        if not payment:
            raise HTTPException(status_code=404, detail="Pago no encontrado")
        return serialize_payment(payment)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener pago: {str(e)}")

# POST /payments
@router.post("/", response_model=PaymentOut, dependencies=[Depends(verify_token)])
def create_payment(data: PaymentIn, db: Database = Depends(get_db)):
    try:
        now = datetime.utcnow()
        payment = data.dict()
        payment["apartmentId"] = ObjectId(payment["apartmentId"])
        payment.update({"createdAt": now, "updatedAt": now})
        result = db["payments"].insert_one(payment)
        new_payment = db["payments"].find_one({"_id": result.inserted_id})
        return serialize_payment(new_payment)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear pago: {str(e)}")

# PATCH /payments/{id}
@router.patch("/{id}", response_model=PaymentOut, dependencies=[Depends(verify_token)])
def update_payment(id: str, data: PaymentIn, db: Database = Depends(get_db)):
    try:
        update_data = {k: v for k, v in data.dict().items() if v is not None}
        if "apartmentId" in update_data:
            update_data["apartmentId"] = ObjectId(update_data["apartmentId"])
        update_data["updatedAt"] = datetime.utcnow()
        result = db["payments"].update_one({"_id": ObjectId(id)}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Pago no encontrado")
        updated = db["payments"].find_one({"_id": ObjectId(id)})
        return serialize_payment(updated)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar pago: {str(e)}")

# DELETE /payments/{id}
@router.delete("/{id}", dependencies=[Depends(verify_token)])
def delete_payment(id: str, db: Database = Depends(get_db)):
    try:
        result = db["payments"].delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Pago no encontrado")
        return {"msg": "Pago eliminado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar pago: {str(e)}")