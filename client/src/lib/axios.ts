// lib/axios.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000", // o import.meta.env.BASE_API
});

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  console.log("💾 TOKEN ENVIADO DESDE AXIOS:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;