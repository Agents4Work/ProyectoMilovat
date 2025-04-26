'use client'

import { useState } from "react";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Calendar as CalendarIcon,
  Clock,
  Info,
  ChevronDown
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

// Props
interface AmenidadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
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

export function AmenidadModal({
  isOpen,
  onClose,
  onSuccess,
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

  const horariosDisponibles = horarios.filter((h) => h.disponible);
  const horariosFinDisponibles = horariosDisponibles.filter(
    (h) => horaInicio && h.hora > horaInicio
  );

  const handleReservar = () => {
    if (!horaInicio || !horaFin) {
      toast({
        title: "Error",
        description: "Debes seleccionar una hora de inicio y fin",
        variant: "destructive"
      });
      return;
    }

    if (!nombreResidente.trim() || !departamento.trim()) {
      toast({
        title: "Error",
        description: "Completa todos los campos",
        variant: "destructive"
      });
      return;
    }

    const numPersonas = parseInt(cantidadPersonas, 10);
    if (
      isNaN(numPersonas) ||
      numPersonas < 1 ||
      numPersonas > amenidad.capacidad
    ) {
      toast({
        title: "Error",
        description: `La cantidad de personas debe estar entre 1 y ${amenidad.capacidad}`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const nuevaReserva: EventoReserva = {
      amenidadId: amenidad.id,
      fecha: format(fechaSeleccionada, "yyyy-MM-dd"),
      horaInicio,
      horaFin,
      usuario: departamento.trim(),
      nombreUsuario: nombreResidente.trim(),
      cantidadPersonas: numPersonas,
      capacidadTotal: amenidad.capacidad
    };

    setTimeout(() => {
      document.dispatchEvent(
        new CustomEvent("nuevaReserva", { detail: nuevaReserva })
      );

      toast({
        title: "Reserva realizada",
        description: `Reservaste ${amenidad.nombre} el ${format(
          fechaSeleccionada,
          "d 'de' MMMM",
          { locale: es }
        )} de ${horaInicio} a ${horaFin}`
      });

      if (onSuccess) onSuccess(); // 🧠 Trigger externo (refetch, update, etc)

      setIsSubmitting(false);
      onClose();
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
          {/* Fecha */}
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-amber-500" />
              Fecha de reserva
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
                >
                  {format(fechaSeleccionada, "EEEE d 'de' MMMM 'de' yyyy", {
                    locale: es
                  })}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800">
                <Calendar
                  mode="single"
                  selected={fechaSeleccionada}
                  onSelect={(date) => date && setFechaSeleccionada(date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  fromDate={new Date()}
                  toDate={addDays(new Date(), 90)}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Datos Amenidad */}
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Info className="h-4 w-4 text-amber-500" />
              Datos de amenidad
            </Label>
            <div className="p-3 rounded bg-zinc-900 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Capacidad:</span>
                <span>{amenidad.capacidad} personas</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Horario:</span>
                <span>{amenidad.horario}</span>
              </div>
              <div className="space-y-2 text-sm">
                <input
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                  placeholder="Departamento (ej: 4B)"
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
                />
                <input
                  value={nombreResidente}
                  onChange={(e) => setNombreResidente(e.target.value)}
                  placeholder="Nombre del residente"
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
                />
                <input
                  type="number"
                  min="1"
                  max={amenidad.capacidad}
                  value={cantidadPersonas}
                  onChange={(e) => setCantidadPersonas(e.target.value)}
                  className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded"
                  placeholder="Cantidad de personas"
                />
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              Horario de reserva
            </Label>
            <Alert className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs">
              <AlertDescription>
                Las reservas son por hora. Selecciona inicio y fin.
              </AlertDescription>
            </Alert>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Inicio</Label>
                <Select value={horaInicio} onValueChange={setHoraInicio}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800">
                    <SelectValue placeholder="Hora" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    {horariosDisponibles.length > 0 ? (
                      horariosDisponibles.map((h, i) => (
                        <SelectItem key={i} value={h.hora}>
                          {h.hora}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        No hay horas
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Fin</Label>
                <Select
                  value={horaFin}
                  onValueChange={setHoraFin}
                  disabled={!horaInicio}
                >
                  <SelectTrigger className="bg-zinc-900 border-zinc-800">
                    <SelectValue placeholder="Hora" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    {horariosFinDisponibles.length > 0 ? (
                      horariosFinDisponibles.map((h, i) => (
                        <SelectItem key={i} value={h.hora}>
                          {h.hora}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        Selecciona inicio
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Visualización */}
          <div className="grid gap-1 mt-2">
            <Label>Disponibilidad:</Label>
            <div className="flex flex-wrap gap-2">
              {horarios.map((h, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className={`text-xs ${
                    h.disponible
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : "bg-red-500/10 text-red-500 border-red-500/20"
                  }`}
                >
                  {h.hora} - {h.disponible ? "Libre" : "Ocupado"}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-zinc-800"
          >
            Cancelar
          </Button>
          <Button
            className="bg-amber-500 hover:bg-amber-600 text-black"
            onClick={handleReservar}
            disabled={
              !horaInicio || !horaFin || !nombreResidente || !departamento || isSubmitting
            }
          >
            {isSubmitting ? "Enviando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}