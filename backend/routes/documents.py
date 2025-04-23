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
def serialize_document(doc):
    doc["_id"] = str(doc["_id"])
    doc["userId"] = str(doc.get("userId", ""))
    doc["name"] = doc.get("name", "")
    doc["type"] = doc.get("type", "PDF")
    doc["url"] = doc.get("url", "")
    doc["date"] = doc.get("date", datetime.utcnow())
    doc["createdAt"] = doc.get("createdAt", datetime.utcnow())
    doc["updatedAt"] = doc.get("updatedAt", datetime.utcnow())
    return doc

# Modelos
class DocumentIn(BaseModel):
    userId: str
    name: str
    type: str
    url: Optional[str] = ""
    date: datetime

class DocumentOut(DocumentIn):
    _id: str
    createdAt: datetime
    updatedAt: datetime

# GET /documents
@router.get("/", response_model=List[DocumentOut], dependencies=[Depends(verify_token)])
def get_documents(db: Database = Depends(get_db)):
    try:
        documents = [serialize_document(d) for d in db["documents"].find()]
        return documents
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener documentos: {str(e)}")

# GET /documents/{id}
@router.get("/{id}", response_model=DocumentOut, dependencies=[Depends(verify_token)])
def get_document(id: str, db: Database = Depends(get_db)):
    try:
        doc = db["documents"].find_one({"_id": ObjectId(id)})
        if not doc:
            raise HTTPException(status_code=404, detail="Documento no encontrado")
        return serialize_document(doc)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener documento: {str(e)}")

# POST /documents
@router.post("/", response_model=DocumentOut, dependencies=[Depends(verify_token)])
def create_document(data: DocumentIn, db: Database = Depends(get_db)):
    try:
        now = datetime.utcnow()
        doc = data.dict()
        doc["userId"] = ObjectId(doc["userId"])
        doc.update({"createdAt": now, "updatedAt": now})
        result = db["documents"].insert_one(doc)
        new_doc = db["documents"].find_one({"_id": result.inserted_id})
        return serialize_document(new_doc)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear documento: {str(e)}")

# PATCH /documents/{id}
@router.patch("/{id}", response_model=DocumentOut, dependencies=[Depends(verify_token)])
def update_document(id: str, data: DocumentIn, db: Database = Depends(get_db)):
    try:
        update_data = {k: v for k, v in data.dict().items() if v is not None}
        if "userId" in update_data:
            update_data["userId"] = ObjectId(update_data["userId"])
        update_data["updatedAt"] = datetime.utcnow()
        result = db["documents"].update_one({"_id": ObjectId(id)}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Documento no encontrado")
        updated = db["documents"].find_one({"_id": ObjectId(id)})
        return serialize_document(updated)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar documento: {str(e)}")

# DELETE /documents/{id}
@router.delete("/{id}", dependencies=[Depends(verify_token)])
def delete_document(id: str, db: Database = Depends(get_db)):
    try:
        result = db["documents"].delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Documento no encontrado")
        return {"msg": "Documento eliminado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar documento: {str(e)}")