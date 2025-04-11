"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VisitFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VisitFormModal({ isOpen, onClose }: VisitFormModalProps) {
  // Estados para los campos del formulario
  const [visitorName, setVisitorName] = useState("");
  const [department, setDepartment] = useState("");
  const [personToVisit, setPersonToVisit] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // IMPORTANTE: Aquí se implementará la generación del código QR usando Python
    // Este botón debe llamar a la API que genera los códigos QR para visitas
    console.log("Generando QR para:", { visitorName, department, personToVisit });
    
    // Limpiar campos y cerrar modal
    setVisitorName("");
    setDepartment("");
    setPersonToVisit("");
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Formulario de Visitas</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Complete este formulario para registrar un visitante y generar su código QR de acceso.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="visitor-name">Nombre del Visitante</Label>
            <Input
              id="visitor-name"
              className="bg-zinc-800 border-zinc-700"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="department">Departamento a visitar</Label>
            <Input
              id="department"
              className="bg-zinc-800 border-zinc-700"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="person-to-visit">Persona a la que visitan</Label>
            <Input
              id="person-to-visit"
              className="bg-zinc-800 border-zinc-700"
              value={personToVisit}
              onChange={(e) => setPersonToVisit(e.target.value)}
              required
            />
          </div>
          
          <DialogFooter className="pt-4">
            {/* 
              =========================================================
              BOTÓN PARA GENERAR QR
              =========================================================
              Aquí se debe implementar la llamada a la API de Python 
              que generará códigos QR para las visitas.
              Este botón activa esa funcionalidad.
              =========================================================
            */}
            <Button 
              type="submit" 
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium"
            >
              Generar QR de Acceso
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}