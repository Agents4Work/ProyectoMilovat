from fastapi import APIRouter, HTTPException, Depends
from pymongo.database import Database
from pydantic import BaseModel
from typing import List, Literal
from datetime import datetime
from bson import ObjectId

from backend.db.mongo import get_db
from backend.utils.security import verify_token

router = APIRouter()

# Utils
def serialize_fine(fine):
    return {
        "id": str(fine["_id"]),
        "departamento": fine["departamento"],
        "propietario": fine["propietario"],
        "monto": fine["monto"],
        "descripcion": fine["descripcion"],
        "fecha": fine["fecha"],
        "estatus": fine["estatus"],
    }

# Schemas
class FineIn(BaseModel):
    departamento: str
    propietario: str
    monto: float
    descripcion: str
    fecha: datetime
    estatus: Literal['Completo', 'Incompleto'] = 'Incompleto'

class FineOut(FineIn):
    id: str

# GET /fines
@router.get("/", response_model=List[FineOut], dependencies=[Depends(verify_token)])
def get_fines(db: Database = Depends(get_db)):
    try:
        fines = db["fines"].find()
        return [serialize_fine(f) for f in fines]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener multas: {str(e)}")

# POST /fines
@router.post("/", response_model=FineOut, dependencies=[Depends(verify_token)])
def create_fine(data: FineIn, db: Database = Depends(get_db)):
    try:
        fine = data.dict()
        result = db["fines"].insert_one(fine)
        new_fine = db["fines"].find_one({"_id": result.inserted_id})
        return serialize_fine(new_fine)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear multa: {str(e)}")

# PATCH /fines/{id}
@router.patch("/{id}", response_model=FineOut, dependencies=[Depends(verify_token)])
def update_fine(id: str, db: Database = Depends(get_db)):
    try:
        result = db["fines"].update_one(
            {"_id": ObjectId(id)},
            {"$set": {"estatus": "Completo"}}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Multa no encontrada")
        updated = db["fines"].find_one({"_id": ObjectId(id)})
        return serialize_fine(updated)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar multa: {str(e)}")

# DELETE /fines/{id} (opcional)
@router.delete("/{id}", dependencies=[Depends(verify_token)])
def delete_fine(id: str, db: Database = Depends(get_db)):
    try:
        result = db["fines"].delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Multa no encontrada")
        return {"msg": "Multa eliminada"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar multa: {str(e)}")