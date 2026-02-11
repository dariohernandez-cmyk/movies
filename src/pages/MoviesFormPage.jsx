import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, createMovie, editMovie } from "../api/movies.api";

export function MoviesFormPage() {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    genre: "",
    release_year: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMovie() {
      if (params.id) {
        try {
          const res = await getMovieById(params.id);
          // Mapeamos los datos del backend al estado local
          setMovie({
            title: res.data.title || "",
            director: res.data.director || "",
            genre: res.data.genre || "",
            release_year: res.data.release_year || "",
            description: res.data.description || "",
          });
        } catch (error) {
          console.error("Error al cargar la película:", error);
        }
      }
    }
    loadMovie();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData es obligatorio para enviar archivos (Multipart/form-data)
    const formData = new FormData();
    formData.append("title", movie.title);
    formData.append("director", movie.director);
    formData.append("genre", movie.genre);
    formData.append("release_year", movie.release_year);
    formData.append("description", movie.description);

    // Solo añadimos la imagen si el usuario seleccionó un archivo físico nuevo
    if (image) {
      formData.append("image", image);
    }

    try {
      if (params.id) {
        // En Django, las actualizaciones con archivos suelen preferir PUT o PATCH
        await editMovie(params.id, formData);
      } else {
        await createMovie(formData);
      }
      navigate("/movies");
    } catch (error) {
      // Importante para el debug: ver qué campo falló (ej: error 400 por release_year)
      console.error("Error detallado del servidor:", error.response?.data);
      alert("Error al guardar. Revisa los datos ingresados.");
    }
  };

  // --- Estilos ---
  const formContainerStyle = {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  };

  const groupStyle = { marginBottom: "20px", display: "flex", flexDirection: "column", gap: "8px" };
  const inputStyle = { padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem", outline: "none" };
  const buttonStyle = {
    padding: "14px 20px",
    backgroundColor: "#2c3e50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    transition: "background 0.3s"
  };

  return (
    <div style={{ backgroundColor: "#f1f2f6", minHeight: "100vh", padding: "20px" }}>
      <div style={formContainerStyle}>
        <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}>
          {params.id ? "✏️ Editar Película" : "🎬 Agregar Nueva Película"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={groupStyle}>
            <label style={{ fontWeight: "600", color: "#2c3e50" }}>Título</label>
            <input
              type="text"
              placeholder="Nombre de la película"
              style={inputStyle}
              value={movie.title}
              onChange={(e) => setMovie({ ...movie, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={groupStyle}>
              <label style={{ fontWeight: "600" }}>Director</label>
              <input
                type="text"
                placeholder="Nombre del director"
                style={inputStyle}
                value={movie.director}
                onChange={(e) => setMovie({ ...movie, director: e.target.value })}
              />
            </div>
            <div style={groupStyle}>
              <label style={{ fontWeight: "600" }}>Género</label>
              <input
                type="text"
                placeholder="Acción, Drama..."
                style={inputStyle}
                value={movie.genre}
                onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
              />
            </div>
          </div>

          <div style={groupStyle}>
            <label style={{ fontWeight: "600" }}>Año de Publicación</label>
            <input
              type="number"
              placeholder="Ej: 2024"
              style={inputStyle}
              value={movie.release_year}
              onChange={(e) => setMovie({ ...movie, release_year: e.target.value })}
            />
          </div>

          <div style={groupStyle}>
            <label style={{ fontWeight: "600" }}>Sinopsis</label>
            <textarea
              placeholder="Resumen de la trama..."
              style={{ ...inputStyle, minHeight: "100px", resize: "none" }}
              value={movie.description}
              onChange={(e) => setMovie({ ...movie, description: e.target.value })}
            />
          </div>

          <div style={groupStyle}>
            <label style={{ fontWeight: "600" }}>Póster de la Película</label>
            <input
              type="file"
              accept="image/*"
              style={{ border: "1px dashed #ccc", padding: "10px", borderRadius: "8px" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
            {params.id && !image && (
              <small style={{ color: "#7f8c8d" }}>Dejar vacío para mantener la imagen actual.</small>
            )}
          </div>

          <button type="submit" style={buttonStyle}>
            {params.id ? "Actualizar Cambios" : "Registrar Película"}
          </button>
        </form>
      </div>
    </div>
  );
}