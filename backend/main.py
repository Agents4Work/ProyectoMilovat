# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Importa el middleware
from dotenv import load_dotenv
load_dotenv()

from backend.routes import users, auth
from backend.routes import apartments
from backend.routes import bookings
from backend.routes import deliveries
from backend.routes import documents
from backend.routes import incidents
from backend.routes import payments
from backend.routes import providers
from backend.routes import reserves
from backend.routes import announcements
from backend.routes import fines

app = FastAPI(
    title="Milovat API",
    version="1.0.0"
)

#Habilita CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Authorization", "Content-Type"],
)

# Rutas
app.include_router(users.router, prefix="/users", tags=["Usuarios"])
app.include_router(auth.router, prefix="/auth", tags=["Autenticación"])
app.include_router(apartments.router, prefix="/apartments", tags=["Apartments"])
app.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])
app.include_router(deliveries.router, prefix="/deliveries", tags=["Deliveries"])
app.include_router(documents.router, prefix="/documents", tags=["Documents"])
app.include_router(incidents.router, prefix="/incidents", tags=["Incidents"])
app.include_router(payments.router, prefix="/payments", tags=["Payments"])
app.include_router(providers.router, prefix="/providers", tags=["Providers"])
app.include_router(reserves.router, prefix="/reserves", tags=["Reserves"])
app.include_router(announcements.router, prefix="/announcements", tags=["Announcements"])
app.include_router(fines.router, prefix="/fines", tags=["Multas"])

@app.get("/")
def root():
    return {"msg": "Backend IAS conectado a MongoDB"}