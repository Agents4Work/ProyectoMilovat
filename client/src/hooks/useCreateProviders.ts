import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface ProviderInput {
  name: string;
  service: string;
  email: string;
  phone: string;
  amount: number;
  documentId?: string;
}

export const useCreateProvider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (provider: ProviderInput) => {
      const res = await axios.post("/providers", provider);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
    }
  });
};