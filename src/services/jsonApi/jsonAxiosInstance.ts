import axios, { AxiosError } from "axios";
const baseUrl = "http://localhost:3000/";

export const jsonAxiosInstance = axios.create({
  baseURL: baseUrl,
});

jsonAxiosInstance.interceptors.request.use((config) => {
  return config;
});

jsonAxiosInstance.interceptors.response.use(
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
