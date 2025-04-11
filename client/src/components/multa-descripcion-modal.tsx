'use client'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign } from "lucide-react";

// Definición de propiedades para el modal
interface MultaDescripcionModalProps {
  isOpen: boolean;
  onClose: () => void;
  multa: {
    id: string;
    departamento: string;
    propietario: string;
    monto: number;
    estatus: 'Completo' | 'Incompleto';
    descripcion: string;
    fecha: string;
  };
}

export function MultaDescripcionModal({
  isOpen,
  onClose,
  multa
}: MultaDescripcionModalProps) {
  // Formateo de fecha
  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalle de Multa</DialogTitle>
          <DialogDescription>
            Información detallada sobre la multa
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Departamento {multa.departamento}</h3>
            <Badge 
              className={`${
                multa.estatus === "Completo" 
                  ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                  : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
              }`}
            >
              {multa.estatus}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-zinc-400">Propietario</p>
            <p className="font-medium">{multa.propietario}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-zinc-400">Monto de la multa</p>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 text-amber-500 mr-1" />
                <p className="font-medium">${multa.monto.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-zinc-400">Fecha de emisión</p>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-amber-500 mr-1" />
                <p className="font-medium">{formatearFecha(multa.fecha)}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-zinc-400">Descripción de la infracción</p>
            <div className="p-3 bg-zinc-900 rounded-md border border-zinc-800">
              <p className="text-sm">{multa.descripcion}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="border-zinc-800"
          >
            Cerrar
          </Button>
          
          {multa.estatus === "Incompleto" && (
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              Marcar como Pagado
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}