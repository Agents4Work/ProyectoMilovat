import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

// Interfaces
export interface Fine {
  id: string;
  departamento: string;
  propietario: string;
  monto: number;
  descripcion: string;
  fecha: string;
  estatus: "Completo" | "Incompleto";
}

type NewFine = Omit<Fine, "id" | "estatus">;

export const useFines = () =>
  useQuery<Fine[]>({
    queryKey: ["fines"],
    queryFn: async () => {
      const res = await axios.get<Fine[]>("/fines");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 min frescura
    retry: 1, // Un solo intento de reintento
  });

export const useCreateFine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fine: NewFine) => {
      const res = await axios.post<Fine>("/fines", {
        ...fine,
        estatus: "Incompleto",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fines"] });
    }
  });
};

export const useMarkFineAsPaid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fineId: string) => {
      const res = await axios.patch<Fine>(`/fines/${fineId}`, {});
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fines"] });
    }
  });
};