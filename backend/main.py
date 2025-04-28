from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from backend.routes import users, auth, apartments, bookings, deliveries, documents, incidents, payments, providers, reserves, announcements, fines
from backend.routes import visits

app = FastAPI(
    title="Milovat API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todo para dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
app.include_router(visits.router, prefix="/visits", tags=["Visits"])

@app.get("/")
def root():
    return {"msg": "Backend IAS conectado a MongoDB"}