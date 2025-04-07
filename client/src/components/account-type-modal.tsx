import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { User, Building2 } from "lucide-react";

/**
 * Interfaz AccountTypeModalProps
 * 
 * Define las propiedades del modal de selección de tipo de cuenta.
 * 
 * @property isOpen - Determina si el modal está visible
 * @property onClose - Función que se ejecuta al cerrar el modal
 * @property onRoleSelected - Función que recibe el rol seleccionado ("resident" o "admin")
 */
interface AccountTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleSelected: (role: "resident" | "admin") => void;
}

/**
 * Componente AccountTypeModal
 * 
 * Este componente muestra un diálogo modal que permite al usuario
 * seleccionar su tipo de cuenta: Residente o Administrador.
 * 
 * Funcionalidades:
 * - Muestra dos opciones con iconos y descripciones
 * - Destaca visualmente la opción seleccionada
 * - Permite confirmar la selección mediante un botón
 * - Comunica la selección al componente padre
 * 
 * @param isOpen - Estado que controla la visibilidad del modal
 * @param onClose - Función para cerrar el modal
 * @param onRoleSelected - Callback que recibe el rol seleccionado
 */
export function AccountTypeModal({ isOpen, onClose, onRoleSelected }: AccountTypeModalProps) {
  const [selectedRole, setSelectedRole] = useState<"resident" | "admin">("resident");
  
  const handleContinue = () => {
    onRoleSelected(selectedRole);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Selecciona tu tipo de cuenta</DialogTitle>
          <DialogDescription>
            Por favor, elige cómo deseas utilizar Milovat. Esto determinará qué funciones estarán disponibles para ti.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup 
            value={selectedRole} 
            onValueChange={(value) => setSelectedRole(value as "resident" | "admin")}
            className="space-y-4"
          >
            {/* Resident option */}
            <div className={`flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${selectedRole === "resident" ? "border-amber-500" : "border-muted"}`}>
              <RadioGroupItem value="resident" id="resident" className="sr-only" />
              <Label 
                htmlFor="resident" 
                className="flex items-center gap-4 cursor-pointer flex-1"
              >
                <div className="relative flex items-center justify-center h-6 w-6">
                  <div className={`h-5 w-5 rounded-full border-2 ${selectedRole === "resident" ? "border-amber-500" : "border-muted-foreground"}`}></div>
                  <div className={`absolute h-3 w-3 rounded-full bg-amber-500 ${selectedRole === "resident" ? "opacity-100" : "opacity-0"}`}></div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <User className={`h-5 w-5 ${selectedRole === "resident" ? "text-amber-500" : "text-muted-foreground"}`} />
                    <span className="font-medium">Residente</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Acceso a pagos, reservas y servicios</p>
                </div>
              </Label>
            </div>
            
            {/* Administrator option */}
            <div className={`flex items-center space-x-4 rounded-lg border p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${selectedRole === "admin" ? "border-amber-500" : "border-muted"}`}>
              <RadioGroupItem value="admin" id="admin" className="sr-only" />
              <Label 
                htmlFor="admin" 
                className="flex items-center gap-4 cursor-pointer flex-1"
              >
                <div className="relative flex items-center justify-center h-6 w-6">
                  <div className={`h-5 w-5 rounded-full border-2 ${selectedRole === "admin" ? "border-amber-500" : "border-muted-foreground"}`}></div>
                  <div className={`absolute h-3 w-3 rounded-full bg-amber-500 ${selectedRole === "admin" ? "opacity-100" : "opacity-0"}`}></div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Building2 className={`h-5 w-5 ${selectedRole === "admin" ? "text-amber-500" : "text-muted-foreground"}`} />
                    <span className="font-medium">Administrador</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Administración completa del edificio</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <Button 
          className="w-full gold-gradient-bg text-black hover:opacity-90"
          onClick={handleContinue}
        >
          Continuar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
