from fastapi import APIRouter, HTTPException
from backend.db.mongo import db
from pydantic import BaseModel
from bson import ObjectId

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
def login(payload: LoginRequest):
    print("🔍 Payload recibido:", payload.dict())

    user = db.users.find_one({"username": payload.username})
    print("🔍 Resultado de Mongo:", user)

    if not user or user["password"] != payload.password:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    return {
        "token": "fake-jwt-token",
        "role": user.get("role", "resident"),
        "userId": str(user["_id"])
    }