'use client'

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface ProveedorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (proveedor: ProveedorFormData) => void;
}

export interface ProveedorFormData {
  servicio: string;
  nombre: string;
  monto: string;
  frecuencia: 'mensual' | 'trimestral' | 'semestral' | 'anual' | 'único';
  comentarios: string;
  fechaInicio: string;
  fechaTermino?: string;
  estado: 'activo' | 'inactivo';
}

export function ProveedorModal({
  isOpen,
  onClose,
  onSave
}: ProveedorModalProps) {
  const [formData, setFormData] = useState<ProveedorFormData>({
    servicio: "",
    nombre: "",
    monto: "",
    frecuencia: "mensual",
    comentarios: "",
    fechaInicio: new Date().toISOString().split('T')[0],
    estado: "activo"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validación básica
    if (!formData.servicio || !formData.nombre || !formData.monto) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulamos envío
    setTimeout(() => {
      try {
        onSave(formData);
        toast({
          title: "Proveedor guardado",
          description: "El proveedor ha sido añadido exitosamente",
        });
        
        // Resetear formulario
        setFormData({
          servicio: "",
          nombre: "",
          monto: "",
          frecuencia: "mensual",
          comentarios: "",
          fechaInicio: new Date().toISOString().split('T')[0],
          estado: "activo"
        });

        onClose();
      } catch (error) {
        toast({
          title: "Error",
          description: "Ocurrió un error al guardar el proveedor",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Proveedor</DialogTitle>
          <DialogDescription>
            Completa la información para registrar un nuevo proveedor o servicio
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="servicio">Servicio <span className="text-red-500">*</span></Label>
              <Input
                id="servicio"
                name="servicio"
                placeholder="Ej: Limpieza, Jardinería"
                className="bg-zinc-900 border-zinc-800"
                value={formData.servicio}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Proveedor <span className="text-red-500">*</span></Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Ej: Empresa S.A."
                className="bg-zinc-900 border-zinc-800"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monto">Monto <span className="text-red-500">*</span></Label>
              <Input
                id="monto"
                name="monto"
                type="number"
                placeholder="Ej: 10000"
                className="bg-zinc-900 border-zinc-800"
                value={formData.monto}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="frecuencia">Frecuencia <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.frecuencia} 
                onValueChange={(value) => handleSelectChange("frecuencia", value as any)}
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <SelectValue placeholder="Seleccionar frecuencia" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="mensual">Mensual</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                  <SelectItem value="semestral">Semestral</SelectItem>
                  <SelectItem value="anual">Anual</SelectItem>
                  <SelectItem value="único">Pago único</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaInicio">Fecha de Inicio <span className="text-red-500">*</span></Label>
              <Input
                id="fechaInicio"
                name="fechaInicio"
                type="date"
                className="bg-zinc-900 border-zinc-800"
                value={formData.fechaInicio}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaTermino">Fecha de Término</Label>
              <Input
                id="fechaTermino"
                name="fechaTermino"
                type="date"
                className="bg-zinc-900 border-zinc-800"
                value={formData.fechaTermino || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            <Select 
              value={formData.estado} 
              onValueChange={(value) => handleSelectChange("estado", value as any)}
            >
              <SelectTrigger className="bg-zinc-900 border-zinc-800">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800">
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comentarios">Comentarios</Label>
            <Textarea
              id="comentarios"
              name="comentarios"
              placeholder="Detalles adicionales sobre el servicio..."
              className="bg-zinc-900 border-zinc-800 min-h-[80px]"
              value={formData.comentarios}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-zinc-800">
            Cancelar
          </Button>
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-black" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar Proveedor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}