'use client'

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

// Lista de departamentos (ejemplos)
const departamentos = [
  "1A", "1B", "1C", "1D", "1E", "1F",
  "2A", "2B", "2C", "2D", "2E", "2F",
  "3A", "3B", "3C", "3D", "3E", "3F",
  "4A", "4B", "4C", "4D", "4E", "4F",
  "5A", "5B", "5C", "5D", "5E", "5F",
  "6A", "6B", "6C", "6D", "6E", "6F",
  "7A", "7B", "7C", "7D", "7E", "7F",
];

// Definición de propiedades para el modal
interface RegistrarVisitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (visita: {
    residente: string;
    departamento: string;
    visitante: string;
    fechaEntrada: string;
  }) => void;
}

export function RegistrarVisitaModal({
  isOpen,
  onClose,
  onSave
}: RegistrarVisitaModalProps) {
  // Estado para el formulario
  const [residente, setResidente] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [visitante, setVisitante] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [hora, setHora] = useState("12:00");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para verificar si el formulario es válido
  const isFormValid = () => {
    return (
      residente.trim() !== "" && 
      departamento.trim() !== "" && 
      visitante.trim() !== "" &&
      fecha.trim() !== "" &&
      hora.trim() !== ""
    );
  };

  // Función para limpiar el formulario
  const resetForm = () => {
    setResidente("");
    setDepartamento("");
    setVisitante("");
    setFecha(new Date().toISOString().split('T')[0]);
    setHora("12:00");
    setIsSubmitting(false);
  };

  // Función para guardar la visita
  const handleSubmit = () => {
    if (!isFormValid()) {
      toast({
        title: "Error en el formulario",
        description: "Por favor completa todos los campos correctamente",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Crear el objeto de visita
    const fechaHora = `${fecha}T${hora}:00`;
    const nuevaVisita = {
      residente,
      departamento,
      visitante,
      fechaEntrada: fechaHora
    };

    // Simulamos un breve retraso para guardar
    setTimeout(() => {
      onSave(nuevaVisita);
      resetForm();
      onClose();
      toast({
        title: "Visita registrada",
        description: `Se ha registrado una visita para el departamento ${departamento}`,
      });
    }, 500);
  };

  // Manejador para limpiar al cerrar
  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle>Registrar Nueva Visita</DialogTitle>
          <DialogDescription>
            Completa los datos para registrar una nueva visita
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="departamento" className="text-right">
              Departamento
            </Label>
            <div className="col-span-3">
              <Select
                value={departamento}
                onValueChange={setDepartamento}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <SelectValue placeholder="Selecciona un departamento" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 max-h-[200px]">
                  {departamentos.map((depto) => (
                    <SelectItem key={depto} value={depto}>
                      {depto}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="residente" className="text-right">
              Nombre Residente
            </Label>
            <Input
              id="residente"
              value={residente}
              onChange={(e) => setResidente(e.target.value)}
              className="col-span-3 bg-zinc-900 border-zinc-800"
              placeholder="Nombre completo del residente"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="visitante" className="text-right">
              Nombre Visitante
            </Label>
            <Input
              id="visitante"
              value={visitante}
              onChange={(e) => setVisitante(e.target.value)}
              className="col-span-3 bg-zinc-900 border-zinc-800"
              placeholder="Nombre completo del visitante"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fecha" className="text-right">
              Fecha de Visita
            </Label>
            <Input
              id="fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="col-span-3 bg-zinc-900 border-zinc-800"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hora" className="text-right">
              Hora de Visita
            </Label>
            <Input
              id="hora"
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="col-span-3 bg-zinc-900 border-zinc-800"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={handleClose}
            className="border-zinc-800"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className="bg-amber-500 hover:bg-amber-600 text-black"
          >
            {isSubmitting ? "Guardando..." : "Guardar Visita"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}