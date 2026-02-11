import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMovies, deleteMovie } from "../api/movies.api";
import { useAuth } from "../context/useAuth";

export function MoviesList() {
  const [movies, setMovies] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await getMovies();
        const apiData = res.data;
        const finalData = apiData.results || apiData;
        setMovies(Array.isArray(finalData) ? finalData : []);
      } catch (err) {
        console.error("Error al cargar películas:", err);
      }
    }
    loadMovies();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;
    if (window.confirm("¿Estás seguro de eliminar esta película?")) {
      try {
        await deleteMovie(id);
        setMovies(movies.filter((movie) => movie.id !== id));
      } catch (err) {
        console.error("Error al eliminar:", err);
        alert("No se pudo eliminar la película.");
      }
    }
  };

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    padding: "30px",
    fontFamily: "'Segoe UI', sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #eee",
    overflow: "hidden",
  };

  const imgStyle = { width: "100%", height: "350px", objectFit: "cover", backgroundColor: "#f0f0f0" };

  const buttonStyle = {
    padding: "8px 15px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginLeft: "5px",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "0.9rem",
    fontWeight: "bold"
  };

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", padding: "40px 0", fontSize: "2.5rem" }}>
        🎬 Catálogo de Películas
      </h1>

      <div style={containerStyle}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} style={cardStyle}>
              {/* Imagen */}
              {movie.image ? (
                <img
                  src={movie.image.startsWith("http") ? movie.image : `http://localhost:8000${movie.image}`}
                  alt={movie.title}
                  style={imgStyle}
                />
              ) : (
                <div style={{ ...imgStyle, display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
                  🖼️ Sin póster
                </div>
              )}

              {/* Información */}
              <div style={{ padding: "20px", flexGrow: 1 }}>
                <h2 style={{ margin: "0 0 10px 0", color: "#333" }}>{movie.title}</h2>
                <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: "1.5" }}>
                  {movie.description}
                </p>
              </div>

              {/* ACCIONES DE ADMINISTRADOR (Eliminar / Editar) */}
              {user && (
                <div style={{ padding: "15px", textAlign: "right", borderTop: "1px solid #eee", background: "#fcfcfc" }}>
                  <button
                    onClick={() => navigate(`/movies/${movie.id}/edit`)}
                    style={{ ...buttonStyle, backgroundColor: "#1e90ff", color: "white" }}
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    style={{ ...buttonStyle, backgroundColor: "#ff4757", color: "white" }}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", gridColumn: "1 / -1" }}>
            <p>No hay películas disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
}