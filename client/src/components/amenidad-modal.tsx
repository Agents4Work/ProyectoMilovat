'use client'

import { useState } from "react";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock, Info, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Definición de propiedades para el modal
interface AmenidadModalProps {
  isOpen: boolean;
  onClose: () => void;
  amenidad: {
    id: string;
    nombre: string;
    descripcion: string;
    horario: string;
    capacidad: number;
  };
  fecha: Date;
  usuario: {
    nombre: string;
    apartamento: string;
  };
  horarios: {
    hora: string;
    disponible: boolean;
  }[];
}

export function AmenidadModal({
  isOpen,
  onClose,
  amenidad,
  fecha,
  usuario,
  horarios
}: AmenidadModalProps) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(fecha);
  const [horaInicio, setHoraInicio] = useState<string>("");
  const [horaFin, setHoraFin] = useState<string>("");
  const [nombreResidente, setNombreResidente] = useState<string>("");
  const [departamento, setDepartamento] = useState<string>("");
  const [cantidadPersonas, setCantidadPersonas] = useState<string>("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  // Solo muestra las horas disponibles para seleccionar
  const horariosDisponibles = horarios.filter(h => h.disponible);
  
  // Filtra las horas de fin posteriores a la hora de inicio
  const horariosFinDisponibles = horariosDisponibles.filter(h => {
    if (!horaInicio) return false;
    return h.hora > horaInicio;
  });

  // Declaramos una propiedad onReservationComplete en las props del componente
  interface EventoReserva {
    amenidadId: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    usuario: string;
    nombreUsuario: string;
    cantidadPersonas: number;
    capacidadTotal: number;
  }

  // Manejador para reservar la amenidad
  const handleReservar = () => {
    if (!horaInicio || !horaFin) {
      toast({
        title: "Error",
        description: "Debes seleccionar una hora de inicio y fin",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    if (!nombreResidente.trim()) {
      toast({
        title: "Error",
        description: "Debes ingresar tu nombre completo",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (!departamento.trim()) {
      toast({
        title: "Error",
        description: "Debes ingresar el número de departamento",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Validamos la cantidad de personas
    const numPersonas = parseInt(cantidadPersonas, 10);
    if (isNaN(numPersonas) || numPersonas < 1 || numPersonas > amenidad.capacidad) {
      toast({
        title: "Error",
        description: `La cantidad de personas debe ser un número entre 1 y ${amenidad.capacidad}`,
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Creamos el objeto de reserva
    const nuevaReserva: EventoReserva = {
      amenidadId: amenidad.id,
      fecha: format(fechaSeleccionada, 'yyyy-MM-dd'),
      horaInicio,
      horaFin,
      usuario: departamento.trim(),
      nombreUsuario: nombreResidente.trim(),
      cantidadPersonas: numPersonas,
      capacidadTotal: amenidad.capacidad
    };
    
    // Simulamos la reserva (aquí iría la llamada al API)
    setTimeout(() => {
      // Evento personalizado para comunicar la nueva reserva
      const reservaEvent = new CustomEvent('nuevaReserva', { 
        detail: nuevaReserva
      });
      document.dispatchEvent(reservaEvent);
      
      toast({
        title: "Reserva realizada",
        description: `Has reservado ${amenidad.nombre} para el ${format(fechaSeleccionada, "d 'de' MMMM", { locale: es })} de ${horaInicio} a ${horaFin} para ${numPersonas} personas`,
      });
      setIsSubmitting(false);
      onClose();
      
      // Limpiar formulario
      setHoraInicio("");
      setHoraFin("");
      setNombreResidente("");
      setDepartamento("");
      setCantidadPersonas("1");
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle>Reservar Amenidad</DialogTitle>
          <DialogDescription>
            Completa la información para reservar {amenidad.nombre}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-amber-500" />
              <Label>Fecha de reserva</Label>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-zinc-900 border-zinc-800 hover:bg-zinc-800 hover:text-white"
                >
                  {format(fechaSeleccionada, "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800">
                <Calendar
                  mode="single"
                  selected={fechaSeleccionada}
                  onSelect={(date) => date && setFechaSeleccionada(date)}
                  disabled={(date) => date < new Date()} // Deshabilita fechas anteriores a hoy
                  initialFocus
                  fromDate={new Date()} // Solo permite seleccionar desde la fecha actual
                  toDate={addDays(new Date(), 90)} // Permite reservar hasta 90 días en el futuro
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-500" />
              <Label>Datos de amenidad</Label>
            </div>
            <div className="p-3 rounded bg-zinc-900 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Capacidad:</span>
                <span className="text-sm">{amenidad.capacidad} personas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-400">Horario disponible:</span>
                <span className="text-sm">{amenidad.horario}</span>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col space-y-1">
                  <Label className="text-sm text-zinc-400">Número de departamento:</Label>
                  <input
                    type="text"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm"
                    placeholder="Ejemplo: 4B, 104, etc."
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label className="text-sm text-zinc-400">Nombre del residente:</Label>
                  <input
                    type="text"
                    value={nombreResidente}
                    onChange={(e) => setNombreResidente(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <Label className="text-sm text-zinc-400">
                    Cantidad de personas: <span className="text-amber-500">{cantidadPersonas}/{amenidad.capacidad}</span>
                  </Label>
                  <input
                    type="number"
                    min="1"
                    max={amenidad.capacidad}
                    value={cantidadPersonas}
                    onChange={(e) => setCantidadPersonas(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-sm"
                    placeholder="Ingresa la cantidad de personas"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <Label>Selecciona el horario</Label>
            </div>
            
            <Alert className="bg-amber-500/10 text-amber-500 border-amber-500/20">
              <AlertDescription className="text-xs">
                Las reservas son por hora. Selecciona hora de inicio y fin.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Hora de inicio</Label>
                <Select value={horaInicio} onValueChange={setHoraInicio}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800">
                    <SelectValue placeholder="Selecciona hora" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    {horariosDisponibles.length > 0 ? (
                      horariosDisponibles.map((h, idx) => (
                        <SelectItem key={idx} value={h.hora}>
                          {h.hora}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No hay horas disponibles
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label className="text-xs">Hora de fin</Label>
                <Select 
                  value={horaFin} 
                  onValueChange={setHoraFin}
                  disabled={!horaInicio}
                >
                  <SelectTrigger className="bg-zinc-900 border-zinc-800">
                    <SelectValue placeholder="Selecciona hora" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    {horariosFinDisponibles.length > 0 ? (
                      horariosFinDisponibles.map((h, idx) => (
                        <SelectItem key={idx} value={h.hora}>
                          {h.hora}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        {horaInicio ? "No hay horas disponibles" : "Selecciona primero hora de inicio"}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="grid gap-2 mt-2">
            <Label>Horarios disponibles:</Label>
            <div className="flex flex-wrap gap-2">
              {horarios.map((horario, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline"
                  className={`${
                    horario.disponible
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : "bg-red-500/10 text-red-500 border-red-500/20"
                  }`}
                >
                  {horario.hora} - {horario.disponible ? "Disponible" : "Ocupado"}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-zinc-800">
            Cancelar
          </Button>
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-black" 
            onClick={handleReservar}
            disabled={!horaInicio || !horaFin || !nombreResidente.trim() || !departamento.trim() || isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Confirmar Reserva"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}