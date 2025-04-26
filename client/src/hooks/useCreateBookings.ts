import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

// Tipado de datos para crear reserva
interface CreateBookingInput {
  instalacion: string;
  fechaInicio: string; // formato ISO: "2025-06-01T10:00:00.000Z"
  fechaFin: string;    // formato ISO: "2025-06-01T12:00:00.000Z"
  userId?: string;     // opcional
}

export const useCreateBookings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBookingInput) => {
      const res = await axios.post("/bookings", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });

      toast({
        title: "Reserva creada ✅",
        description: "La reservación se ha guardado correctamente.",
      });
    },
    onError: () => {
      toast({
        title: "Error al crear reserva",
        description: "No se pudo guardar la reservación.",
        variant: "destructive",
      });
    },
  });
};