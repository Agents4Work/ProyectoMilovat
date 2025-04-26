// src/hooks/useProviders.ts

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "@/lib/axios";

// 🧠 Interfaz global para Provider
export interface Provider {
  _id: string;
  company: string;          // Se alimentará desde "name" del backend
  service: string;
  email: string;
  phone: string;
  amount: number;
  documentId?: string | null;
  createdAt: string;
  updatedAt: string;
}

// 🧪 Hook con tipado correcto + mapeo ajustado
export const useProviders = (): UseQueryResult<Provider[], Error> => {
  return useQuery<Provider[], Error>({
    queryKey: ["providers"],
    queryFn: async () => {
      const res = await axios.get("/providers");

      console.log("🔥 RAW PROVIDERS FROM API:", res.data);

      return res.data.map((p: any): Provider => ({
        _id: p._id,
        company: p.name ?? "",        // 👈 CORREGIDO: el backend da "name"
        service: p.service ?? "",
        email: p.email ?? "",
        phone: p.phone ?? "",
        amount: p.amount ?? 0,
        documentId: p.documentId ?? null,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }));
    },
    staleTime: 1000 * 60 * 2,
  });
};