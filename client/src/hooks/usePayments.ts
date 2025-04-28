// src/hooks/usePayments.ts
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

// Interfaces
export interface Payment {
  _id: string;
  apartmentId: string | null;
  concept: string;
  amount: number;
  dueDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentDate?: string;
}

export const usePayments = () => {
  return useQuery<Payment[]>({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axios.get("/payments");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de frescura
    retry: 1, // 1 solo reintento si falla
  });
};