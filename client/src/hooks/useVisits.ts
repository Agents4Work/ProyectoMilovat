import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

export interface Visit {
  _id: string;
  apartmentId: string;
  visitorName: string;
  entryTime: string;
  exitTime: string | null;
}

export const useVisits = () => {
  return useQuery<Visit[]>({
    queryKey: ["visits"],
    queryFn: async () => {
      const { data } = await axios.get("/visits");
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};