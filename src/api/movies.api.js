import api from "./axios"; // Importamos la instancia que ya tiene el interceptor

// Obtener todas las películas
// Si Django devuelve paginación, recuerda que el array estará en res.data.results
export const getMovies = () => api.get("movies/");

// Obtener una película por ID
export const getMovieById = (id) => api.get(`movies/${id}/`);

// Crear película
// Usamos el segundo argumento para pasar los datos. 
// Axios detecta automáticamente si es FormData y pone el Content-Type correcto.
export const createMovie = (movieData) => api.post("movies/", movieData);

// Editar película
export const editMovie = (id, movieData) => api.put(`movies/${id}/`, movieData);

// Eliminar película
export const deleteMovie = (id) => api.delete(`movies/${id}/`);