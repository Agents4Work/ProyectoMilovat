// src/hooks/useAvailableTimes.ts
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface OccupiedTime {
  inicio: number;
  fin: number;
}

interface AvailableTime {
  hora: string;
  disponible: boolean;
}

export const useAvailableTimes = (instalacion: string, fecha: string) => {
  const enabled = Boolean(instalacion && fecha); //Calculamos si debe activarse el query

  return useQuery<AvailableTime[]>({
    queryKey: ["horarios", instalacion, fecha],
    queryFn: async () => {
      if (!instalacion || !fecha) return []; //Protección adicional extra

      const res = await axios.get("/bookings/horarios", {
        params: { instalacion, fecha },
      });
      const ocupados: OccupiedTime[] = res.data;

      const todasLasHoras = Array.from({ length: 12 }, (_, i) => i + 8); // 8:00 a 20:00

      const disponibles = todasLasHoras.filter(hora => {
        return !ocupados.some(
          (reserva) => hora >= reserva.inicio && hora < reserva.fin
        );
      });

      return disponibles.map(hora => ({
        hora: `${hora.toString().padStart(2, "0")}:00`,
        disponible: true,
      }));
    },
    enabled, // ⚡ Solo corre si instalacion y fecha son válidos
    staleTime: 1000 * 60, // 1 min cache
  });
};