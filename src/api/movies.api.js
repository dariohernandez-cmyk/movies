import api from "./axios"; 

// 1. Obtener todas las películas

export const getMovies = () => api.get("movies/");

// 2. Obtener una película por ID
export const getMovieById = (id) => api.get(`movies/${id}/`);

// 3. Crear película

export const createMovie = (movieData) => api.post("movies/", movieData, {
    headers: {
        "Content-Type": "multipart/form-data", // Necesario para subir imágenes
    }
});

// 4. Editar película

export const editMovie = (id, movieData) => api.put(`movies/${id}/`, movieData, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

// 5. Eliminar película
export const deleteMovie = (id) => api.delete(`movies/${id}/`);