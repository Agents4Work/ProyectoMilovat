"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CrearProveedorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (provider: {
    name: string;
    service: string;
    email: string;
    phone: string;
    amount: number;
  }) => void;
}

export function CrearProveedorModal({
  isOpen,
  onClose,
  onSave,
}: CrearProveedorModalProps) {
  const [form, setForm] = useState({
    name: "", // CAMBIO
    service: "",
    email: "",
    phone: "",
    amount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.service) return; // CAMBIO

    onSave({
      name: form.name, // MAPEADO CORRECTO
      service: form.service,
      email: form.email,
      phone: form.phone,
      amount: parseFloat(form.amount) || 0,
    });

    onClose();
    setForm({ name: "", service: "", email: "", phone: "", amount: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-lg">Nuevo proveedor</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {["name", "service", "email", "phone", "amount"].map((field) => (
            <div key={field} className="grid gap-1">
              <Label htmlFor={field}>{field[0].toUpperCase() + field.slice(1)}</Label>
              <Input
                id={field}
                name={field}
                value={(form as any)[field]}
                onChange={handleChange}
                type={field === "amount" ? "number" : "text"}
                placeholder={`Ingresa ${field}`}
                className="bg-zinc-900 border-zinc-800"
              />
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="border-zinc-800">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-amber-500 text-black hover:bg-amber-600"
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}