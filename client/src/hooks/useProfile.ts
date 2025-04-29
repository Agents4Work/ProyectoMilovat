// src/hooks/useProfile.ts
import { useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";

interface UpdatePasswordData {
  userId: string;
  newPassword: string;
}

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: async ({ userId, newPassword }: UpdatePasswordData) => {
      const { data } = await axios.patch(`/users/${userId}`, {
        password: newPassword,
      });
      return data;
    },
  });
};