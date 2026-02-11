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
        const res = await getMovieById(params.id);
        setMovie(res.data);
      }
    }
    loadMovie();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(movie).forEach(key => formData.append(key, movie[key]));
    if (image) formData.append("image", image);

    try {
      if (params.id) {
        await editMovie(params.id, formData);
      } else {
        await createMovie(formData);
      }
      navigate("/movies");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar la película.");
    }
  };

  // --- Estilos Modernos ---
  const formContainerStyle = {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Roboto, sans-serif"
  };

  const groupStyle = {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  };

  const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.3s"
  };

  const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#3742fa",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  };

  return (
    <div style={{ backgroundColor: "#f1f2f6", minHeight: "100vh", padding: "20px" }}>
      <div style={formContainerStyle}>
        <h2 style={{ textAlign: "center", color: "#2f3542", marginBottom: "30px" }}>
          {params.id ? "🎬 Editar Película" : "🎬 Agregar Nueva Película"}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={groupStyle}>
            <label style={{ fontWeight: "600", color: "#57606f" }}>Título</label>
            <input
              type="text"
              placeholder="Ej: Inception"
              style={inputStyle}
              value={movie.title}
              onChange={(e) => setMovie({ ...movie, title: e.target.value })}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={groupStyle}>
              <label style={{ fontWeight: "600", color: "#57606f" }}>Director</label>
              <input
                type="text"
                placeholder="Nombre del director"
                style={inputStyle}
                value={movie.director}
                onChange={(e) => setMovie({ ...movie, director: e.target.value })}
              />
            </div>
            <div style={groupStyle}>
              <label style={{ fontWeight: "600", color: "#57606f" }}>Género</label>
              <input
                type="text"
                placeholder="Ej: Ciencia Ficción"
                style={inputStyle}
                value={movie.genre}
                onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
              />
            </div>
          </div>

          <div style={groupStyle}>
            <label style={{ fontWeight: "600", color: "#57606f" }}>Año de Publicación</label>
            <input
              type="number"
              placeholder="Ej: 2026"
              style={inputStyle}
              value={movie.release_year}
              onChange={(e) => setMovie({ ...movie, release_year: e.target.value })}
            />
          </div>

          <div style={groupStyle}>
            <label style={{ fontWeight: "600", color: "#57606f" }}>Sinopsis</label>
            <textarea
              placeholder="Describe brevemente la película..."
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
              value={movie.description}
              onChange={(e) => setMovie({ ...movie, description: e.target.value })}
            />
          </div>

          <div style={groupStyle}>
            <label style={{ fontWeight: "600", color: "#57606f" }}>Póster de la Película</label>
            <input
              type="file"
              accept="image/*"
              style={{ ...inputStyle, border: "1px dashed #3742fa", background: "#f8f9ff" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" style={buttonStyle}>
            💾 {params.id ? "Actualizar Película" : "Guardar Película"}
          </button>
        </form>
      </div>
    </div>
  );
}