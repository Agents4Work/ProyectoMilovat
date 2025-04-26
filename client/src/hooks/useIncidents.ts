import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

// Cómo se ve un incidente que recibimos
export interface Incident {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export const useIncidents = () => {
  return useQuery<Incident[]>({
    queryKey: ["incidents"],
    queryFn: async () => {
      const res = await axios.get("/incidents");
      return res.data;
    },
  });
};