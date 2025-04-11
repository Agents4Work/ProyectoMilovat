import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Package, Clock, User, Building, Check } from "lucide-react";

// Interfaz para los paquetes
interface Paquete {
  id: string;
  empresa: string;
  fechaLlegada: string;
  hora: string;
  destinatario: string;
  estado: "Pendiente" | "Recogido";
  apartamento: string;
}

interface PackageListModalProps {
  isOpen: boolean;
  onClose: () => void;
  paquetes: Paquete[];
}

export function PackageListModal({ isOpen, onClose, paquetes }: PackageListModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filtrar paquetes según la búsqueda
  const paquetesFiltrados = paquetes.filter(paquete => 
    paquete.empresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paquete.destinatario.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paquete.apartamento.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Función para marcar un paquete como recogido
  const handleMarkAsCollected = (id: string) => {
    console.log(`Paquete ${id} marcado como recogido`);
    // Aquí iría la lógica para actualizar el estado del paquete
    // En una implementación real, esto actualizaría la base de datos
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle>Paquetes por recoger</DialogTitle>
          <DialogDescription>
            Lista de paquetes pendientes de recoger en recepción
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input 
            placeholder="Buscar por empresa, destinatario o apartamento..." 
            className="bg-zinc-900/50 border-zinc-800 pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {paquetesFiltrados.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              No se encontraron paquetes que coincidan con tu búsqueda
            </div>
          ) : (
            paquetesFiltrados.map((paquete) => (
              <div 
                key={paquete.id} 
                className={`border border-zinc-800 rounded-lg p-4 ${
                  paquete.estado === "Pendiente" 
                    ? "bg-black/30" 
                    : "bg-zinc-800/30 opacity-75"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-medium">{paquete.empresa}</h4>
                      <p className="text-sm text-zinc-400">
                        {paquete.fechaLlegada} - {paquete.hora}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    paquete.estado === "Pendiente" 
                      ? "bg-amber-500/20 text-amber-400" 
                      : "bg-green-500/20 text-green-400"
                  }`}>
                    {paquete.estado}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-zinc-500" />
                    <span className="text-zinc-300">Destinatario: <span className="font-medium">{paquete.destinatario}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-zinc-500" />
                    <span className="text-zinc-300">Apartamento: <span className="font-medium">{paquete.apartamento}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-zinc-500" />
                    <span className="text-zinc-300">Hora de llegada: <span className="font-medium">{paquete.hora}</span></span>
                  </div>
                </div>
                
                {paquete.estado === "Pendiente" && (
                  <div className="flex justify-end">
                    <Button 
                      className="bg-amber-500 hover:bg-amber-600 text-black"
                      size="sm"
                      onClick={() => handleMarkAsCollected(paquete.id)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Marcar como recogido
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        <DialogFooter>
          <div className="w-full flex justify-between items-center">
            <p className="text-sm text-zinc-500">
              Total: <span className="text-white">{paquetesFiltrados.filter(p => p.estado === "Pendiente").length} paquetes por recoger</span>
            </p>
            <DialogClose asChild>
              <Button variant="outline">Cerrar</Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}