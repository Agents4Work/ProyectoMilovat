from fastapi import APIRouter
from backend.db.mongo import db

router = APIRouter()

@router.get("/")
def get_users():
    users = list(db.users.find({}, {"password": 0}))  # sin contraseñas
    for user in users:
        user["_id"] = str(user["_id"])
    return users