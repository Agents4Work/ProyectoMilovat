'use client';

import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Calendar as CalendarIcon, CheckCircle2, Clock } from "lucide-react";
import { AmenidadModal } from "@/components/amenidad-modal";

// Definición de una amenidad
interface Amenidad {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  horario: string;
  capacidad: number;
  reservaciones: Reservacion[];
}

// Definición de una reservación
interface Reservacion {
  id: string;
  amenidadId: string;
  fecha: string; // formato: YYYY-MM-DD
  horaInicio: string; // formato: HH:MM (24h)
  horaFin: string; // formato: HH:MM (24h)
  usuario: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada';
}

export default function Amenidades() {
  const [, navigate] = useLocation();
  const [userRole, setUserRole] = useState<"resident" | "admin" | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedAmenidad, setSelectedAmenidad] = useState<Amenidad | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentUser] = useState({
    nombre: "Carlos Ramírez", 
    apartamento: "4B"
  });
  
  // Lista de amenidades disponibles
  const [amenidades] = useState<Amenidad[]>([
    {
      id: "1",
      nombre: "Salón de eventos / fiestas",
      imagen: "salon-eventos",
      descripcion: "Espacio amplio ideal para celebraciones y reuniones, con capacidad para 50 personas",
      horario: "8:00 - 22:00",
      capacidad: 50,
      reservaciones: [
        {
          id: "r1",
          amenidadId: "1",
          fecha: "2025-04-12",
          horaInicio: "18:00",
          horaFin: "22:00",
          usuario: "2A",
          estado: 'confirmada'
        }
      ]
    },
    {
      id: "2",
      nombre: "Terraza / rooftop",
      imagen: "terraza",
      descripcion: "Área al aire libre con vista panorámica, ideal para eventos pequeños",
      horario: "10:00 - 22:00",
      capacidad: 30,
      reservaciones: []
    },
    {
      id: "3",
      nombre: "Gimnasio / sala de fitness",
      imagen: "gimnasio",
      descripcion: "Equipado con máquinas cardiovasculares, pesas y área de entrenamiento",
      horario: "6:00 - 22:00",
      capacidad: 15,
      reservaciones: [
        {
          id: "r2",
          amenidadId: "3",
          fecha: "2025-04-11",
          horaInicio: "7:00",
          horaFin: "8:00",
          usuario: "4B",
          estado: 'confirmada'
        }
      ]
    },
    {
      id: "4",
      nombre: "Sala de juntas / coworking",
      imagen: "sala-juntas",
      descripcion: "Espacio para reuniones de trabajo, con mesa para 10 personas y equipo audiovisual",
      horario: "8:00 - 20:00",
      capacidad: 10,
      reservaciones: []
    },
    {
      id: "5",
      nombre: "Área de parrillas / BBQ",
      imagen: "bbq",
      descripcion: "Zona equipada con parrillas, mesas y sillas para eventos al aire libre",
      horario: "10:00 - 22:00",
      capacidad: 20,
      reservaciones: []
    },
    {
      id: "6",
      nombre: "Piscina / alberca",
      imagen: "piscina",
      descripcion: "Piscina climatizada con área de descanso y sombrillas",
      horario: "7:00 - 21:00",
      capacidad: 25,
      reservaciones: [
        {
          id: "r3",
          amenidadId: "6",
          fecha: "2025-04-11",
          horaInicio: "15:00",
          horaFin: "16:00",
          usuario: "5C",
          estado: 'confirmada'
        }
      ]
    },
    {
      id: "7",
      nombre: "Cancha deportiva",
      imagen: "cancha",
      descripcion: "Cancha multiusos para basquetbol, voleibol y fútbol rápido",
      horario: "7:00 - 21:00",
      capacidad: 12,
      reservaciones: []
    },
    {
      id: "8",
      nombre: "Spa / sauna",
      imagen: "spa",
      descripcion: "Área de relajación con sauna seco y húmedo, así como duchas",
      horario: "8:00 - 20:00",
      capacidad: 8,
      reservaciones: []
    },
    {
      id: "9",
      nombre: "Lavandería compartida",
      imagen: "lavanderia",
      descripcion: "Equipada con lavadoras y secadoras de alta capacidad",
      horario: "6:00 - 22:00",
      capacidad: 6,
      reservaciones: []
    },
    {
      id: "10",
      nombre: "Área de juegos infantiles",
      imagen: "juegos",
      descripcion: "Zona segura con juegos para niños de diferentes edades",
      horario: "8:00 - 20:00",
      capacidad: 15,
      reservaciones: []
    }
  ]);

  // Verificar si una hora está reservada
  const isHoraReservada = (amenidadId: string, fecha: string, hora: string) => {
    const amenidad = amenidades.find(a => a.id === amenidadId);
    if (!amenidad) return false;
    
    return amenidad.reservaciones.some(r => 
      r.fecha === fecha && 
      r.estado === 'confirmada' &&
      hora >= r.horaInicio && 
      hora < r.horaFin
    );
  };

  // Generar horarios disponibles en intervalos de 1 hora
  const getHorariosDisponibles = (amenidadId: string) => {
    const amenidad = amenidades.find(a => a.id === amenidadId);
    if (!amenidad) return [];

    const [horaInicio, horaFin] = amenidad.horario.split(' - ');
    const [horaInicioHora] = horaInicio.split(':').map(Number);
    const [horaFinHora] = horaFin.split(':').map(Number);
    
    const fechaFormateada = date ? format(date, 'yyyy-MM-dd') : '';
    
    const horarios = [];
    for (let hora = horaInicioHora; hora < horaFinHora; hora++) {
      const horaString = `${hora.toString().padStart(2, '0')}:00`;
      const reservado = isHoraReservada(amenidadId, fechaFormateada, horaString);
      
      horarios.push({
        hora: horaString,
        disponible: !reservado
      });
    }
    
    return horarios;
  };

  // Abrir el modal de reserva
  const handleReservarClick = (amenidad: Amenidad) => {
    setSelectedAmenidad(amenidad);
    setShowModal(true);
  };

  useEffect(() => {
    // Get user role from session storage
    const role = sessionStorage.getItem('userRole') as "resident" | "admin" | null;
    
    if (!role) {
      // Redirect to login if no role
      navigate('/auth');
      return;
    }
    
    setUserRole(role);
  }, [navigate]);
  
  // Wait until we have determined the user role
  if (!userRole) {
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar userRole={userRole} />
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-medium mb-2">Amenidades</h1>
        <p className="text-zinc-400 mb-6">Reserva las instalaciones del edificio</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de amenidades - 2 columnas */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {amenidades.map((amenidad) => (
                <Card key={amenidad.id} className="border-zinc-800 bg-zinc-900/50 overflow-hidden flex flex-col">
                  <CardHeader className="border-b border-zinc-800 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{amenidad.nombre}</CardTitle>
                        <CardDescription className="text-zinc-400 mt-1">
                          <div className="flex items-center mb-1">
                            <Clock className="h-3.5 w-3.5 text-amber-500 mr-1" />
                            <span className="text-xs">Horario: {amenidad.horario}</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 mr-1" />
                            <span className="text-xs">Capacidad: {amenidad.capacidad} personas</span>
                          </div>
                        </CardDescription>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="border-amber-500/30 bg-amber-500/10 text-amber-500 px-2 py-1 text-xs"
                      >
                        {amenidad.reservaciones.length > 0 ? 
                          `${amenidad.reservaciones.length} reservas` : 
                          "Disponible"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <p className="text-sm text-zinc-300 mb-4">
                      {amenidad.descripcion}
                    </p>
                    
                    <div className="grid grid-cols-4 gap-2 mt-2">
                      {getHorariosDisponibles(amenidad.id).slice(0, 8).map((horario, idx) => (
                        <Badge 
                          key={idx}
                          variant="outline" 
                          className={`border-zinc-800 justify-center ${
                            horario.disponible 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {horario.hora}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 px-4 pb-4">
                    <Button 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black" 
                      onClick={() => handleReservarClick(amenidad)}
                    >
                      Reservar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Calendario y detalles */}
          <div className="lg:col-span-1">
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardHeader className="border-b border-zinc-800 pb-4">
                <CardTitle className="text-lg">Calendario de Reservas</CardTitle>
                <CardDescription className="text-zinc-400">
                  Selecciona una fecha para ver disponibilidad
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="mx-auto"
                  locale={es}
                />
                
                {date && (
                  <div className="mt-4">
                    <h3 className="font-medium text-sm mb-2">
                      Reservas para el {format(date, "d 'de' MMMM", { locale: es })}
                    </h3>
                    <div className="space-y-2">
                      {amenidades
                        .flatMap(a => a.reservaciones
                          .filter(r => r.fecha === format(date, 'yyyy-MM-dd') && r.estado === 'confirmada')
                          .map(r => ({
                            ...r,
                            amenidad: a.nombre
                          }))
                        )
                        .length > 0 ? (
                          amenidades
                            .flatMap(a => a.reservaciones
                              .filter(r => r.fecha === format(date, 'yyyy-MM-dd') && r.estado === 'confirmada')
                              .map(r => ({
                                ...r,
                                amenidad: a.nombre
                              }))
                            )
                            .map((reserva, idx) => (
                              <div 
                                key={idx} 
                                className="p-2 rounded bg-zinc-800 text-xs"
                              >
                                <p className="font-medium">{reserva.amenidad}</p>
                                <p className="text-zinc-400">
                                  {reserva.horaInicio} - {reserva.horaFin} hs
                                </p>
                                <p className="text-zinc-400">
                                  {reserva.usuario === currentUser.apartamento ? 
                                    "Tu reserva" : 
                                    `Reservado por: ${reserva.usuario}`}
                                </p>
                              </div>
                            ))
                        ) : (
                          <div className="flex items-center justify-center p-4 text-zinc-500 text-sm">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            No hay reservas para esta fecha
                          </div>
                        )
                      }
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0 px-4 pb-4 flex flex-col gap-2">
                <div className="flex items-center justify-between w-full text-xs text-zinc-400 mb-1">
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    Disponible
                  </div>
                  <div className="flex items-center">
                    <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                    Ocupado
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-zinc-800"
                  onClick={() => navigate('/dashboard')}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Volver al calendario
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Modal de reserva */}
      {selectedAmenidad && (
        <AmenidadModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          amenidad={selectedAmenidad}
          fecha={date || new Date()}
          usuario={currentUser}
          horarios={getHorariosDisponibles(selectedAmenidad.id)}
        />
      )}
    </div>
  );
}