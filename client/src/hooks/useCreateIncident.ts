import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

// Define cómo luce una nueva incidencia
interface IncidentInput {
  userId: string;
  title: string;
  description: string;
  status?: string;
  priority?: string;
  category: string;
}

export const useCreateIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (incident: IncidentInput) => {
      const res = await axios.post("/incidents", {
        ...incident,
        status: incident.status ?? "open",
        priority: incident.priority ?? "medium",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
  });
};