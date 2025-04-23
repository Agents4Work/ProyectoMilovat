# backend/routes/auth.py

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from backend.db.mongo import get_db
from pymongo.database import Database
from backend.utils.jwt_handler import create_access_token
from backend.utils.security import verify_token  # 👈 nuevo import con HTTPBearer

router = APIRouter()

# 📦 Modelo de entrada para login
class LoginRequest(BaseModel):
    username: str
    password: str

# 🔓 Login — genera JWT si las credenciales son válidas
@router.post("/login")
def login(payload: LoginRequest, db: Database = Depends(get_db)):
    user = db["users"].find_one({"username": payload.username})

    if not user or user["password"] != payload.password:
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    token_data = {
        "user_id": str(user["_id"]),
        "role": user.get("role", "resident")
    }

    token = create_access_token(token_data)

    return {
        "token": token,
        "role": token_data["role"],
        "userId": token_data["user_id"]
    }

# 🔐 Ruta protegida con HTTP Bearer
@router.get("/me")
def get_me(payload: dict = Depends(verify_token)):
    return {
        "user_id": payload["user_id"],
        "role": payload["role"]
    }