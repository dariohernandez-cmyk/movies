import axios from "axios";

const moviesApi = axios.create({
  baseURL: "http://localhost:8000/api/movies/",
});

// GET – listar películas
export const getMovies = () => moviesApi.get("/");

// GET – obtener una película por id
export const getMovie = (id) => moviesApi.get(`/${id}/`);

// POST – crear película
export const createMovie = (movie) => moviesApi.post("/", movie);

// PUT – actualizar película
export const updateMovie = (id, movie) =>
  moviesApi.put(`/${id}/`, movie);

// DELETE – eliminar película
export const deleteMovie = (id) =>
  moviesApi.delete(`/${id}/`);
