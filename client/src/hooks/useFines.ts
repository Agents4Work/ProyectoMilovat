import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// API Base URL
const API = "http://127.0.0.1:8000/fines";
const getToken = () => sessionStorage.getItem("token") || "";

// Tipos
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

// GET: Fetch fines
export const useFines = () =>
  useQuery<Fine[]>({
    queryKey: ["fines"],
    queryFn: async () => {
      const res = await axios.get<Fine[]>(API, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      return res.data;
    }
  });

// POST: Create a fine
export const useCreateFine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fine: NewFine) => {
      const res = await axios.post<Fine>(
        API,
        { ...fine, estatus: "Incompleto" },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fines"] });
    }
  });
};

// PATCH: Mark fine as paid
export const useMarkFineAsPaid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fineId: string) => {
      const res = await axios.patch<Fine>(
        `${API}/${fineId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fines"] });
    }
  });
};