import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API = "http://localhost:8000/announcements";
const getToken = () => sessionStorage.getItem("token");

export const useAnnouncements = () => {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 2, // 2 min cache
  });
};