# backend/utils/security.py

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from backend.utils.jwt_handler import decode_access_token

bearer_scheme = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    token = credentials.credentials
    print("TOKEN RECIBIDO:", token)
    payload = decode_access_token(token)
    print("📦 PAYLOAD DECODIFICADO:", payload)  # Debug
    if payload is None:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    return payload