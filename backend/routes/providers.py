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
def serialize_provider(provider):
    provider["_id"] = str(provider["_id"])
    provider["documentId"] = str(provider.get("documentId", ""))
    provider["company"] = provider.get("company", "")
    provider["service"] = provider.get("service", "")
    provider["email"] = provider.get("email", "")
    provider["phone"] = provider.get("phone", "")
    provider["amount"] = float(provider.get("amount", 0))
    provider["createdAt"] = provider.get("createdAt", datetime.utcnow())
    provider["updatedAt"] = provider.get("updatedAt", datetime.utcnow())
    return provider

# Modelos
class ProviderIn(BaseModel):
    company: str
    service: str
    email: str
    phone: str
    amount: float
    documentId: Optional[str] = None

class ProviderOut(ProviderIn):
    _id: str
    createdAt: datetime
    updatedAt: datetime

# GET /providers
@router.get("/", response_model=List[ProviderOut], dependencies=[Depends(verify_token)])
def get_providers(db: Database = Depends(get_db)):
    try:
        providers = [serialize_provider(p) for p in db["providers"].find()]
        return providers
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener proveedores: {str(e)}")

# GET /providers/{id}
@router.get("/{id}", response_model=ProviderOut, dependencies=[Depends(verify_token)])
def get_provider(id: str, db: Database = Depends(get_db)):
    try:
        provider = db["providers"].find_one({"_id": ObjectId(id)})
        if not provider:
            raise HTTPException(status_code=404, detail="Proveedor no encontrado")
        return serialize_provider(provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener proveedor: {str(e)}")

# POST /providers
@router.post("/", response_model=ProviderOut, dependencies=[Depends(verify_token)])
def create_provider(data: ProviderIn, db: Database = Depends(get_db)):
    try:
        now = datetime.utcnow()
        provider = data.dict()
        if provider.get("documentId"):
            provider["documentId"] = ObjectId(provider["documentId"])
        provider.update({"createdAt": now, "updatedAt": now})
        result = db["providers"].insert_one(provider)
        new_provider = db["providers"].find_one({"_id": result.inserted_id})
        return serialize_provider(new_provider)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear proveedor: {str(e)}")

# PATCH /providers/{id}
@router.patch("/{id}", response_model=ProviderOut, dependencies=[Depends(verify_token)])
def update_provider(id: str, data: ProviderIn, db: Database = Depends(get_db)):
    try:
        update_data = {k: v for k, v in data.dict().items() if v is not None}
        if "documentId" in update_data:
            update_data["documentId"] = ObjectId(update_data["documentId"])
        update_data["updatedAt"] = datetime.utcnow()
        result = db["providers"].update_one({"_id": ObjectId(id)}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Proveedor no encontrado")
        updated = db["providers"].find_one({"_id": ObjectId(id)})
        return serialize_provider(updated)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar proveedor: {str(e)}")

# DELETE /providers/{id}
@router.delete("/{id}", dependencies=[Depends(verify_token)])
def delete_provider(id: str, db: Database = Depends(get_db)):
    try:
        result = db["providers"].delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Proveedor no encontrado")
        return {"msg": "Proveedor eliminado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar proveedor: {str(e)}")