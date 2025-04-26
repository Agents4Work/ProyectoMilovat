'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import DashboardSidebar from "@/components/dashboard-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar as CalendarIcon, CheckCircle2, Clock } from "lucide-react";
import { AmenidadModal } from "@/components/amenidad-modal";
import { useBookings, Booking } from "@/hooks/useBookings";

export default function Amenidades() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showModal, setShowModal] = useState(false);
  const [currentUser] = useState({
    nombre: "Carlos Ramírez",
    apartamento: "4B"
  });

  const { data: bookings = [], refetch } = useBookings();

  useEffect(() => {
    const role = sessionStorage.getItem('userRole') as "resident" | "admin" | null;
    if (!role) {
      navigate('/auth');
      return;
    }
    setUserRole(role);
  }, [navigate]);

  if (!userRole) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  const reservasFiltradas = bookings.filter((reserva) =>
    date ? format(new Date(reserva.fechaInicio), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') : true
  );

  const mockAmenidad = {
    id: "mock-id",
    nombre: "Salón de eventos",
    descripcion: "Descripción de prueba",
    horario: "8:00 - 22:00",
    capacidad: 50
  };

  const mockHorarios = [
    { hora: "08:00", disponible: true },
    { hora: "09:00", disponible: true },
    { hora: "10:00", disponible: false },
    { hora: "11:00", disponible: true }
  ];

  const renderAdminView = () => (
    <div className="flex h-screen bg-background">
      <DashboardSidebar userRole={userRole} />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-6">Gestión de Reservas</h1>
        <Card className="border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <CardHeader className="border-b border-zinc-800 pb-4">
            <CardTitle>Reservaciones Actuales</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/50">
                    <th className="text-left py-3 px-4">Amenidad</th>
                    <th className="text-left py-3 px-4">Usuario</th>
                    <th className="text-left py-3 px-4">Inicio</th>
                    <th className="text-left py-3 px-4">Fin</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((reserva) => (
                      <tr key={reserva._id} className="border-b border-zinc-800 hover:bg-zinc-800/30">
                        <td className="py-3 px-4">{reserva.instalacion}</td>
                        <td className="py-3 px-4">{reserva.userId || "Sin usuario"}</td>
                        <td className="py-3 px-4">{format(new Date(reserva.fechaInicio), 'Pp', { locale: es })}</td>
                        <td className="py-3 px-4">{format(new Date(reserva.fechaFin), 'Pp', { locale: es })}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-zinc-400">
                        No hay reservas
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );

  const renderResidentView = () => (
    <div className="flex h-screen bg-background">
      <DashboardSidebar userRole={userRole} />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-6">Reservar Amenidad</h1>
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="border-b border-zinc-800 pb-4">
            <CardTitle>Calendario de Reservas</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto"
              locale={es}
            />
          </CardContent>
          <CardFooter className="flex justify-between p-4">
            <Button onClick={() => setShowModal(true)} className="bg-amber-500 hover:bg-amber-600 text-black">
              Nueva Reserva
            </Button>
          </CardFooter>
        </Card>

        {/* Mostrar Reservas del Día */}
        <Card className="border-zinc-800 bg-zinc-900/50 mt-6">
          <CardHeader className="border-b border-zinc-800 pb-4">
            <CardTitle>Reservas para {date ? format(date, "d 'de' MMMM", { locale: es }) : ''}</CardTitle>
          </CardHeader>
          <CardContent>
            {reservasFiltradas.length > 0 ? (
              reservasFiltradas.map((r) => (
                <div key={r._id} className="flex justify-between py-2 border-b border-zinc-800">
                  <div>
                    <div className="font-medium">{r.instalacion}</div>
                    <div className="text-zinc-400 text-sm">{format(new Date(r.fechaInicio), 'p', { locale: es })} - {format(new Date(r.fechaFin), 'p', { locale: es })}</div>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-500/30 bg-green-500/10">Confirmada</Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-zinc-500">No hay reservas</div>
            )}
          </CardContent>
        </Card>

        {/* Modal */}
        {showModal && (
          <AmenidadModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSuccess={refetch}
            amenidad={mockAmenidad}
            fecha={date || new Date()}
            usuario={currentUser}
            horarios={mockHorarios}
          />
        )}
      </main>
    </div>
  );

  return userRole === "admin" ? renderAdminView() : renderResidentView();
}