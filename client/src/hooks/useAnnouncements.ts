import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";

export const useAnnouncements = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("/announcements");
      return res.data.map((a: any) => ({
        id: a._id || crypto.randomUUID(),
        titulo: a.title || "Sin título",
        contenido: a.description || "",
        categoria: a.category || "general",
        destacado: a.highlight || false,
        imageUrl: a.imageUrl || null,
        fechaCreacion: a.date || new Date().toISOString(),
        autor: a.autor || "Administración"
      }));
    },
    staleTime: 1000 * 60 * 2,
  });
};