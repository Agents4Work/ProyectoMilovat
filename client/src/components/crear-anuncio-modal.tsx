'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Image } from "lucide-react";

// Propiedades del modal
interface CrearAnuncioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (anuncio: {
    titulo: string;
    contenido: string;
    categoria: string;
    destacado: boolean;
    imageUrl?: string;
  }) => void;
}

export function CrearAnuncioModal({ isOpen, onClose, onSave }: CrearAnuncioModalProps) {
  // Estado para los campos del formulario
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("general");
  const [destacado, setDestacado] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Manejo del cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Crear una URL para previsualizar la imagen
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // En un entorno real aquí subiríamos la imagen a un servidor
      // y obtendríamos la URL definitiva
      // Por ahora, solo simulamos el nombre de archivo
      setImageUrl(`/anuncios/${file.name}`);
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setTitulo("");
    setContenido("");
    setCategoria("general");
    setDestacado(false);
    setImageUrl(undefined);
    setImagePreview(null);
  };

  // Manejo del cierre del modal
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Manejo del guardado del anuncio
  const handleSave = () => {
    onSave({
      titulo,
      contenido,
      categoria,
      destacado,
      imageUrl
    });
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[550px] bg-zinc-950 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl">Crear nuevo anuncio</DialogTitle>
          <DialogDescription>
            Completa el formulario para crear un nuevo anuncio o comunicado para los residentes.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="titulo">Título del anuncio</Label>
            <Input
              id="titulo"
              placeholder="Ej: Mantenimiento de elevadores"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="bg-zinc-900/50 border-zinc-800"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="contenido">Contenido</Label>
            <Textarea
              id="contenido"
              placeholder="Describe los detalles del anuncio..."
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              className="min-h-[120px] bg-zinc-900/50 border-zinc-800"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="categoria">Categoría</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-zinc-800">
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="mantenimiento">Mantenimiento</SelectItem>
                <SelectItem value="eventos">Eventos</SelectItem>
                <SelectItem value="seguridad">Seguridad</SelectItem>
                <SelectItem value="comunicados">Comunicados oficiales</SelectItem>
                <SelectItem value="avisos">Avisos importantes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="imagen">Imagen (opcional)</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Label 
                  htmlFor="imagen" 
                  className="cursor-pointer flex items-center gap-2 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 rounded-md px-3 py-2"
                >
                  <Image className="h-4 w-4" />
                  <span>{imageUrl ? "Cambiar imagen" : "Seleccionar imagen"}</span>
                </Label>
                <Input
                  id="imagen"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              
              {imagePreview && (
                <div className="relative w-full h-40 rounded-md overflow-hidden bg-zinc-900/50 border border-zinc-800">
                  <img 
                    src={imagePreview} 
                    alt="Vista previa" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}
              
              {!imagePreview && (
                <div className="w-full h-40 rounded-md bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500">
                  <div className="flex flex-col items-center">
                    <Image className="h-8 w-8 mb-2 opacity-50" />
                    <span className="text-sm">No se ha seleccionado imagen</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="destacado"
              checked={destacado}
              onCheckedChange={setDestacado}
            />
            <Label htmlFor="destacado" className="flex items-center gap-2">
              Marcar como destacado 
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </Label>
          </div>
          
          <div className="text-xs text-zinc-500 bg-zinc-900/50 p-2 rounded">
            Los anuncios destacados aparecerán en la parte superior y con un estilo distintivo.
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} className="border-zinc-800">
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-amber-500 hover:bg-amber-600 text-black"
            disabled={!titulo || !contenido}
          >
            Publicar anuncio
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}