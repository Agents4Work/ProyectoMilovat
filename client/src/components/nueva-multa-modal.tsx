'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import type { NewFine } from "@/pages/multas";

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

interface NuevaMultaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (multa: NewFine) => void;
}

export default function NuevaMultaModal({
  isOpen,
  onClose,
  onSave
}: NuevaMultaModalProps) {
  const [departamento, setDepartamento] = useState("");
  const [propietario, setPropietario] = useState("");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () => {
    return (
      departamento.trim() !== "" && 
      propietario.trim() !== "" && 
      monto.trim() !== "" && 
      !isNaN(Number(monto)) && 
      Number(monto) > 0 &&
      descripcion.trim() !== "" &&
      fecha.trim() !== ""
    );
  };

  const resetForm = () => {
    setDepartamento("");
    setPropietario("");
    setMonto("");
    setDescripcion("");
    setFecha(new Date().toISOString().split('T')[0]);
    setIsSubmitting(false);
  };

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

    const nuevaMulta: NewFine = {
      departamento,
      propietario,
      monto: Number(monto),
      descripcion,
      fecha,
      estatus: "Incompleto" // ✅ incluido para cumplir con el tipo
    };

    setTimeout(() => {
      onSave(nuevaMulta);
      resetForm();
      onClose();
      toast({
        title: "Multa creada",
        description: `Se ha registrado una nueva multa para el departamento ${departamento}`,
      });
    }, 500);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle>Nueva Multa</DialogTitle>
          <DialogDescription>
            Completa los datos para registrar una nueva multa
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="departamento" className="text-right">Departamento</Label>
            <div className="col-span-3">
              <Select value={departamento} onValueChange={setDepartamento}>
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
            <Label htmlFor="propietario" className="text-right">Propietario</Label>
            <Input
              id="propietario"
              value={propietario}
              onChange={(e) => setPropietario(e.target.value)}
              className="col-span-3 bg-zinc-900 border-zinc-800"
              placeholder="Nombre del propietario"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="monto" className="text-right">Monto</Label>
            <div className="col-span-3 relative">
              <span className="absolute left-3 top-2.5 text-zinc-400">$</span>
              <Input
                id="monto"
                type="number"
                min="1"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="bg-zinc-900 border-zinc-800 pl-7"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fecha" className="text-right">Fecha de Emisión</Label>
            <Input
              id="fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="col-span-3 bg-zinc-900 border-zinc-800"
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="descripcion" className="text-right pt-2">Descripción</Label>
            <Textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="col-span-3 min-h-[100px] bg-zinc-900 border-zinc-800"
              placeholder="Detalles sobre la infracción..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} className="border-zinc-800">Cancelar</Button>
          <Button onClick={handleSubmit} disabled={!isFormValid() || isSubmitting} className="bg-amber-500 hover:bg-amber-600 text-black">
            {isSubmitting ? "Guardando..." : "Guardar Multa"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}