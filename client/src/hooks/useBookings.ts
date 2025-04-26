import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

export interface Booking {
  _id: string;
  instalacion: string;
  fechaInicio: string;
  fechaFin: string;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
}

export const useBookings = () => {
  return useQuery<Booking[]>({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axios.get("/bookings");
      return res.data;
    },
  });
};