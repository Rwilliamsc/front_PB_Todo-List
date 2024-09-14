// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Coloque a URL base do seu backend aqui
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
