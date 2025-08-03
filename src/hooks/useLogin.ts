import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "./useUserStore";
import API from "@/api/axios";
import { getMe } from "@/api/auth.api";

type LoginPayload = {
  username: string;
  password: string;
};

export function useLogin() {
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await API.post("/auth/login", data);
      const access_token = res.data.access_token;
      localStorage.setItem("access_token", access_token);

      const me = await getMe();

      return me.data;
    },
    onSuccess: (userData) => {
      setUser(userData);
      window.location.href = "/";
    },
  });
}
