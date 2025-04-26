import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

// Tipado para la data parcial que se actualizará
interface UpdateIncidentInput {
  id: string;
  status: "open" | "in_progress" | "resolved";
}

export const useUpdateIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: UpdateIncidentInput) => {
      const res = await axios.patch(`/incidents/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      // Refrescar automáticamente la lista de incidencias
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
  });
};