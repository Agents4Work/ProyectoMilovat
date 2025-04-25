import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API = "http://localhost:8000/announcements";
const getToken = () => sessionStorage.getItem("token");

export const useCreateAnuncio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (anuncio: {
      titulo: string;
      contenido: string;
      categoria: string;
      destacado: boolean;
      fechaCreacion: string;
    }) => {
      const body = {
        title: anuncio.titulo,
        description: anuncio.contenido,
        category: anuncio.categoria,
        highlight: anuncio.destacado,
        date: anuncio.fechaCreacion, // ISO string expected
      };

      const res = await axios.post(API, body, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};