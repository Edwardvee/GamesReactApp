import axios, { AxiosError } from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  params: { key: import.meta.env.VITE_API_KEY },
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.message) {
      return Promise.reject({
        code: error.status, // Código de error genérico
        message: error.message,
      });
    }

    return Promise.reject({
      code: "9999",
      message: "Error desconocido",
    });
  }
);
