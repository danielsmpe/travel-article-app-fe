import API from "./axios";

export const login = (data: { email: string; password: string }) =>
  API.post("/auth/login", data);

export const register = (data: {
  name: string;
  email: string;
  password: string;
}) => API.post("/auth/register", data);

export const getMe = () => API.get("/users/me");
