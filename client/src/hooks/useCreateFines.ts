import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface NewFine {
  apartmentId: string;
  amount: number;
  concept: string;
  dueDate: string;
}

export const useCreateFine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newFine: NewFine) => {
      const payload = {
        ...newFine,
        type: "fine",
        status: "pending",
      };
      const { data } = await axios.post("/payments", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["fines"]});
    },
  });
};