import axios from "axios";

// Crear instancia de axios para movies
const moviesApi = axios.create({
  baseURL: "http://localhost:8000/api/movies/", // Django API
});

// Función para agregar token si existe y opcionalmente Content-Type
const getConfig = (isMultipart = false) => {
  const token = localStorage.getItem("token");
  const headers = {};

  if (token) headers["Authorization"] = `Token ${token}`;
  if (isMultipart) headers["Content-Type"] = "multipart/form-data";

  return { headers };
};

// ------------------------------------
// FUNCIONES API
// ------------------------------------

// Obtener todas las películas (GET, no multipart)
export const getMovies = () => moviesApi.get("/", getConfig());

// Obtener una película por ID (GET)
export const getMovieById = (id) => moviesApi.get(`${id}/`, getConfig());

// Crear película (POST, multipart)
export const createMovie = (movie) => moviesApi.post("/", movie, getConfig(true));

// Editar película (PUT, multipart)
export const editMovie = (id, movie) => moviesApi.put(`${id}/`, movie, getConfig(true));

// Eliminar película (DELETE, no multipart)
export const deleteMovie = (id) => moviesApi.delete(`${id}/`, getConfig());
