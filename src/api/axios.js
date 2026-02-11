import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// Interceptor para adjuntar el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Asegúrate de que el nombre coincida con el que usas al hacer login
  if (token) {
    // CAMBIO IMPORTANTE: Verifica si tu backend espera "Bearer" o "Token"
    // Si usas SimpleJWT en Django, deja "Bearer". Si usas el Token normal, cámbialo a "Token".
    config.headers.Authorization = `Token ${token}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;