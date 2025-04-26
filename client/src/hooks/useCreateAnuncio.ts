import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

export const useCreateAnuncio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (anuncio: {
      titulo: string;
      contenido?: string;
      categoria?: string;
      destacado?: boolean;
      imageUrl?: string;
      fechaCreacion: string;
    }) => {
      const body = {
        title: anuncio.titulo,
        description: anuncio.contenido ?? "",
        category: anuncio.categoria ?? "general",
        highlight: anuncio.destacado ?? false,
        imageUrl: anuncio.imageUrl ?? "",
        date: anuncio.fechaCreacion,
      };

      const res = await axios.post("/announcements", body);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};