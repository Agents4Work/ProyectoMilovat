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
def serialize_incident(incident):
    incident["_id"] = str(incident["_id"])
    incident["userId"] = str(incident.get("userId", ""))
    incident["status"] = incident.get("status", "open")
    incident["priority"] = incident.get("priority", "medium")
    incident["category"] = incident.get("category", "general")
    incident["createdAt"] = incident.get("createdAt", datetime.utcnow())
    incident["updatedAt"] = incident.get("updatedAt", datetime.utcnow())
    return incident

# Modelos
class IncidentIn(BaseModel):
    userId: str
    title: str
    description: Optional[str] = ""
    status: Optional[str] = "open"
    priority: Optional[str] = "medium"
    category: Optional[str] = "general"

class IncidentOut(IncidentIn):
    _id: str
    createdAt: datetime
    updatedAt: datetime

# GET /incidents
@router.get("/", response_model=List[IncidentOut], dependencies=[Depends(verify_token)])
def get_incidents(db: Database = Depends(get_db)):
    try:
        incidents = [serialize_incident(i) for i in db["incidents"].find()]
        return incidents
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener reportes: {str(e)}")

# GET /incidents/{id}
@router.get("/{id}", response_model=IncidentOut, dependencies=[Depends(verify_token)])
def get_incident(id: str, db: Database = Depends(get_db)):
    try:
        incident = db["incidents"].find_one({"_id": ObjectId(id)})
        if not incident:
            raise HTTPException(status_code=404, detail="Reporte no encontrado")
        return serialize_incident(incident)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener reporte: {str(e)}")

# POST /incidents
@router.post("/", response_model=IncidentOut, dependencies=[Depends(verify_token)])
def create_incident(data: IncidentIn, db: Database = Depends(get_db)):
    try:
        now = datetime.utcnow()
        incident = data.dict()
        incident["userId"] = ObjectId(incident["userId"])
        incident.update({"createdAt": now, "updatedAt": now})
        result = db["incidents"].insert_one(incident)
        new_incident = db["incidents"].find_one({"_id": result.inserted_id})
        return serialize_incident(new_incident)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear reporte: {str(e)}")

# PATCH /incidents/{id}
@router.patch("/{id}", response_model=IncidentOut, dependencies=[Depends(verify_token)])
def update_incident(id: str, data: IncidentIn, db: Database = Depends(get_db)):
    try:
        update_data = {k: v for k, v in data.dict().items() if v is not None}
        if "userId" in update_data:
            update_data["userId"] = ObjectId(update_data["userId"])
        update_data["updatedAt"] = datetime.utcnow()
        result = db["incidents"].update_one({"_id": ObjectId(id)}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Reporte no encontrado")
        updated = db["incidents"].find_one({"_id": ObjectId(id)})
        return serialize_incident(updated)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar reporte: {str(e)}")

# DELETE /incidents/{id}
@router.delete("/{id}", dependencies=[Depends(verify_token)])
def delete_incident(id: str, db: Database = Depends(get_db)):
    try:
        result = db["incidents"].delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Reporte no encontrado")
        return {"msg": "Reporte eliminado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar reporte: {str(e)}")