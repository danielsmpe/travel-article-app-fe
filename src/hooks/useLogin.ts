import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "./useUserStore";
import API from "@/api/axios";

type LoginPayload = {
  username: string;
  password: string;
};

export function useLogin() {
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await API.post("/auth/login", data);
      console.log("Login response:", res.data);
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem("accessToken", data.access_token);
      window.location.href = "/";
    },
  });
}
