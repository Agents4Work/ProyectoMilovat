"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useCreateIncident } from "@/hooks/useCreateIncident";
import { toast } from "@/hooks/use-toast";

interface IncidenciaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Para refrescar datos si se necesita
}

export function IncidenciaFormModal({ isOpen, onClose, onSuccess }: IncidenciaFormModalProps) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [formError, setFormError] = useState("");

  const createIncident = useCreateIncident();

  const handleSubmit = async () => {
    if (!titulo.trim()) {
      setFormError("El título es obligatorio");
      return;
    }
    if (!descripcion.trim()) {
      setFormError("La descripción es obligatoria");
      return;
    }
    if (!departamento) {
      setFormError("Selecciona un departamento");
      return;
    }

    try {
      await createIncident.mutateAsync({
        userId: sessionStorage.getItem("userId") || "000000000000000000000000", // Usa el real de sessionStorage
        title: titulo,
        description: descripcion,
        category: departamento,
      });

      toast({
        title: "Incidencia creada",
        description: "Tu reporte fue registrado correctamente.",
      });

      setTitulo("");
      setDescripcion("");
      setDepartamento("");
      setFormError("");
      onClose();
      onSuccess?.(); // Refreshea datos si existe el callback
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar la incidencia.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl">Nueva Incidencia</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Reporta una incidencia para que el equipo de administración pueda atenderla.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Campo Título */}
          <div className="space-y-2">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              placeholder="Ej: Fuga de agua en baño principal"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="bg-zinc-950 border-zinc-800"
            />
          </div>

          {/* Campo Descripción */}
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              placeholder="Describe detalladamente el problema..."
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="bg-zinc-950 border-zinc-800 resize-none"
            />
          </div>

          {/* Campo Departamento */}
          <div className="space-y-2">
            <Label htmlFor="departamento">Departamento</Label>
            <Select value={departamento} onValueChange={setDepartamento}>
              <SelectTrigger id="departamento" className="bg-zinc-950 border-zinc-800">
                <SelectValue placeholder="Selecciona un departamento" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="Piso 1">Piso 1</SelectItem>
                <SelectItem value="Piso 2">Piso 2</SelectItem>
                <SelectItem value="Piso 3">Piso 3</SelectItem>
                <SelectItem value="Areas comunes">Áreas comunes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formError && (
            <p className="text-red-500 text-sm mt-2">{formError}</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-zinc-800">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-amber-500 hover:bg-amber-600 text-black">
            Crear Incidencia
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}