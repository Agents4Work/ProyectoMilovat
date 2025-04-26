from fastapi import APIRouter, HTTPException, Depends
from pymongo.database import Database
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from backend.db.mongo import get_db
from backend.utils.security import verify_token

router = APIRouter()

# Serializador robusto
def serialize_announcement(a):
    return {
        "_id": str(a.get("_id", "")),
        "title": a.get("title", "Sin título"),
        "description": a.get("description", "Sin descripción"),
        "category": a.get("category", "general"),
        "highlight": a.get("highlight", False),
        "imageUrl": a.get("imageUrl", ""),
        "date": a.get("date", datetime.utcnow()),
        "createdAt": a.get("createdAt", datetime.utcnow()),
        "updatedAt": a.get("updatedAt", datetime.utcnow()),
    }

# Modelos de entrada y salida
class AnnouncementIn(BaseModel):
    title: str
    description: str
    category: str
    highlight: Optional[bool] = False
    date: datetime

class AnnouncementOut(AnnouncementIn):
    _id: str
    createdAt: datetime
    updatedAt: datetime

# GET /announcements
@router.get("", response_model=List[AnnouncementOut], dependencies=[Depends(verify_token)])
def get_announcements(db: Database = Depends(get_db)):
    try:
        data = db["announcements"].find().sort("date", -1)
        return [serialize_announcement(a) for a in data]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener anuncios: {str(e)}")

# POST /announcements
@router.post("", response_model=AnnouncementOut, dependencies=[Depends(verify_token)])
def create_announcement(data: AnnouncementIn, db: Database = Depends(get_db)):
    try:
        now = datetime.utcnow()
        anuncio = data.dict()
        anuncio.update({"createdAt": now, "updatedAt": now})
        result = db["announcements"].insert_one(anuncio)
        new = db["announcements"].find_one({"_id": result.inserted_id})
        return serialize_announcement(new)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear anuncio: {str(e)}")