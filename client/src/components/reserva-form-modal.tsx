// src/components/reserva-form-modal.tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateBookings } from "@/hooks/useCreateBookings";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  amenidad: {
    id: string;
    nombre: string;
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

export function ReservaFormModal({ isOpen, onClose, amenidad, fecha, usuario, horarios }: Props) {
  const [horaInicio, setHoraInicio] = useState("");
  const [duracion, setDuracion] = useState(1); // en horas
  const [personas, setPersonas] = useState(1);

  const createBooking = useCreateBookings();

  const handleSubmit = async () => {
    if (!horaInicio) {
      toast({
        title: "Selecciona un horario",
        description: "Debes elegir una hora de inicio.",
        variant: "destructive",
      });
      return;
    }

    const [hInicio] = horaInicio.split(":").map(Number);
    const hFin = hInicio + duracion;
    const horaFin = `${hFin.toString().padStart(2, "0")}:00`;

    const fechaInicio = new Date(fecha);
    fechaInicio.setHours(hInicio, 0, 0, 0);

    const fechaFin = new Date(fecha);
    fechaFin.setHours(hFin, 0, 0, 0);

    try {
      await createBooking.mutateAsync({
        instalacion: amenidad.nombre,
        fechaInicio: fechaInicio.toISOString(),
        fechaFin: fechaFin.toISOString(),
        userId: usuario.apartamento,
      });

      toast({
        title: "Reserva creada",
        description: `${amenidad.nombre} reservado para el ${format(fecha, "dd/MM/yyyy")} de ${horaInicio} a ${horaFin}`,
      });

      // Emitir evento para actualizar local
      const evento = new CustomEvent("nuevaReserva", {
        detail: {
          amenidadId: amenidad.id,
          fecha: format(fecha, "yyyy-MM-dd"),
          horaInicio,
          horaFin,
          usuario: usuario.apartamento,
          nombreUsuario: usuario.nombre,
          cantidadPersonas: personas,
          capacidadTotal: amenidad.capacidad,
        },
      });
      document.dispatchEvent(evento);

      onClose();
    } catch (err) {
      toast({
        title: "Error al reservar",
        description: "Hubo un problema al registrar tu reserva.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Reservar {amenidad.nombre}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label className="text-zinc-300 text-sm">Horario disponible</Label>
            <Select value={horaInicio} onValueChange={setHoraInicio}>
              <SelectTrigger className="mt-1 bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Elige una hora" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                {horarios
                  .filter(h => h.disponible)
                  .map((h, idx) => (
                    <SelectItem key={idx} value={h.hora}>
                      {h.hora}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-zinc-300 text-sm">Duración (horas)</Label>
            <Input
              type="number"
              min={1}
              max={3}
              value={duracion}
              onChange={(e) => setDuracion(Number(e.target.value))}
              className="bg-zinc-800 text-white mt-1"
            />
          </div>

          <div>
            <Label className="text-zinc-300 text-sm">Personas</Label>
            <Input
              type="number"
              min={1}
              max={amenidad.capacidad}
              value={personas}
              onChange={(e) => setPersonas(Number(e.target.value))}
              className="bg-zinc-800 text-white mt-1"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button onClick={handleSubmit} className="bg-amber-500 hover:bg-amber-600 text-black">
            Confirmar Reserva
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}