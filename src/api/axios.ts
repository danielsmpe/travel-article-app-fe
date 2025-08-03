import axios from "axios";

const API = axios.create({
  baseURL: process.env.VITE_API_URL || "http://localhost:3000/",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
