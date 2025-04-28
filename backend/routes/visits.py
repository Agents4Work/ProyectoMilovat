from fastapi import APIRouter, Depends
from backend.db.mongo import get_db
from pymongo.database import Database
from backend.utils.security import verify_token
from bson import ObjectId

router = APIRouter()

@router.get("/", dependencies=[Depends(verify_token)])
def get_visits(db: Database = Depends(get_db)):
    visitas_cursor = db["visits"].find()
    visitas = []
    for visita in visitas_cursor:
        visitas.append({
            "_id": str(visita["_id"]),
            "apartmentId": str(visita.get("apartmentId", "")),  # Forzamos string aquí también
            "visitorName": visita.get("visitorName", ""),
            "entryTime": visita.get("entryTime"),
            "exitTime": visita.get("exitTime", None)
        })
    return visitas