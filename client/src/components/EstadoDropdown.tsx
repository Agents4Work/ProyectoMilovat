// src/components/EstadoDropdown.tsx

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateIncident } from "@/hooks/useUpdateIncident";
import { toast } from "@/hooks/use-toast";

interface Props {
  currentStatus: "open" | "in_progress" | "resolved";
  incidentId: string;
  refetch: () => void; //Agregamos refetch para refreshear
}

export function EstadoDropdown({ currentStatus, incidentId, refetch }: Props) {
  const updateStatus = useUpdateIncident();

  const handleChange = async (value: string) => {
    try {
      await updateStatus.mutateAsync({
        id: incidentId,
        status: value as "open" | "in_progress" | "resolved",
      });

      toast({
        title: "Estado actualizado",
        description: `La incidencia fue marcada como ${value === "resolved" ? "resuelta" : value === "in_progress" ? "en proceso" : "abierta"}.`,
      });

      refetch(); //Actualiza la tabla inmediatamente
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado.",
        variant: "destructive",
      });
    }
  };

  return (
    <Select value={currentStatus} onValueChange={handleChange}>
      <SelectTrigger className="w-[140px] bg-zinc-900 border-zinc-800 text-white">
        <SelectValue placeholder="Estado" />
      </SelectTrigger>
      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
        <SelectItem value="open">Abierto</SelectItem>
        <SelectItem value="in_progress">En proceso</SelectItem>
        <SelectItem value="resolved">Resuelto</SelectItem>
      </SelectContent>
    </Select>
  );
}