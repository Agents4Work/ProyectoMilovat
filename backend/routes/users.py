from fastapi import APIRouter, HTTPException, Depends
from pymongo.database import Database
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

from backend.db.mongo import get_db
from backend.utils.security import verify_token

router = APIRouter()

# Serializador
def serialize_user(user):
    user["_id"] = str(user["_id"])
    user["phone"] = user.get("phone", "")
    user["role"] = user.get("role", "resident")
    user["createdAt"] = user.get("createdAt", datetime.utcnow())
    user["updatedAt"] = user.get("updatedAt", datetime.utcnow())
    if "password" in user:
        del user["password"]  # 🔐 Nunca enviar password
    return user

# Modelos
class UserIn(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str
    role: Optional[str] = "resident"
    phone: Optional[str] = ""

class UserOut(BaseModel):
    _id: str
    firstName: str
    lastName: str
    email: EmailStr
    role: str
    phone: Optional[str]
    createdAt: datetime
    updatedAt: datetime

# GET /users
@router.get("/", response_model=List[UserOut], dependencies=[Depends(verify_token)])
def get_users(db: Database = Depends(get_db)):
    try:
        users = [serialize_user(u) for u in db["users"].find()]
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener usuarios: {str(e)}")

# GET /users/{id}
@router.get("/{id}", response_model=UserOut, dependencies=[Depends(verify_token)])
def get_user(id: str, db: Database = Depends(get_db)):
    try:
        user = db["users"].find_one({"_id": ObjectId(id)})
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        return serialize_user(user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener usuario: {str(e)}")

# POST /users
@router.post("/", response_model=UserOut, dependencies=[Depends(verify_token)])
def create_user(data: UserIn, db: Database = Depends(get_db)):
    try:
        now = datetime.utcnow()
        user = data.dict()
        user.update({"createdAt": now, "updatedAt": now})
        result = db["users"].insert_one(user)
        new_user = db["users"].find_one({"_id": result.inserted_id})
        return serialize_user(new_user)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear usuario: {str(e)}")

# PATCH /users/{id}
@router.patch("/{id}", response_model=UserOut, dependencies=[Depends(verify_token)])
def update_user(id: str, data: UserIn, db: Database = Depends(get_db)):
    try:
        update_data = {k: v for k, v in data.dict().items() if v is not None}
        update_data["updatedAt"] = datetime.utcnow()
        result = db["users"].update_one({"_id": ObjectId(id)}, {"$set": update_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        updated = db["users"].find_one({"_id": ObjectId(id)})
        return serialize_user(updated)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar usuario: {str(e)}")

# DELETE /users/{id}
@router.delete("/{id}", dependencies=[Depends(verify_token)])
def delete_user(id: str, db: Database = Depends(get_db)):
    try:
        result = db["users"].delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")
        return {"msg": "Usuario eliminado"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar usuario: {str(e)}")