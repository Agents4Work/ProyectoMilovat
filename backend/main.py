from fastapi import FastAPI
from backend.routes import users  # importaremos esto ya

app = FastAPI()

# Enrutar
app.include_router(users.router, prefix="/users", tags=["Usuarios"])

@app.get("/")
def root():
    return {"msg": "Backend IAS conectado Mongo"}

from backend.routes import auth

app.include_router(auth.router, prefix="/auth", tags=["Autenticación"])