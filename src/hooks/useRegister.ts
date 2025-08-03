import API from "@/api/axios";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await API.post("/users/register", data);
      return res.data;
    },
    onSuccess: () => {
      window.location.href = "/auth";
    },
  });
}
