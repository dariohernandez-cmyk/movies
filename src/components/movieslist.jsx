import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies, deleteMovie } from "../api/movies.api";
import { useAuth } from "../context/useAuth";

export function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Añadido para mejor UX
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await getMovies();
        // EXPLICACIÓN PARA EL VIDEO: 
        // Django REST Framework puede devolver los datos directamente [] 
        // o dentro de un objeto si hay paginación { results: [] }
        const data = res.data.results || res.data;
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error al cargar películas:", err);
      } finally {
        setLoading(false);
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
        alert("No tienes permisos para eliminar o hubo un error en el servidor.");
      }
    }
  };

  // --- Estilos ---
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
    padding: "40px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s ease",
  };

  const imgStyle = {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    backgroundColor: "#dfe4ea"
  };

  return (
    <div style={{ backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", padding: "50px 0", color: "#2f3542", fontWeight: "800" }}>
        🎬 Catálogo de Cine
      </h1>

      {loading ? (
        <p style={{ textAlign: "center" }}>Cargando películas...</p>
      ) : (
        <div style={containerStyle}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} style={cardStyle} className="movie-card">
                {/* Lógica de Imagen Corregida */}
                {movie.image ? (
                  <img
                    src={movie.image} // Django REST Framework ya suele enviar la URL completa
                    alt={movie.title}
                    style={imgStyle}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x600?text=Sin+Poster"; }}
                  />
                ) : (
                  <div style={{ ...imgStyle, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    🎥 Sin Imagen
                  </div>
                )}

                <div style={{ padding: "20px", flex: 1 }}>
                  <h2 style={{ fontSize: "1.4rem", marginBottom: "10px" }}>{movie.title}</h2>
                  <p style={{ color: "#747d8c", fontSize: "0.9rem", marginBottom: "5px" }}>
                    <strong>Director:</strong> {movie.director || "No especificado"}
                  </p>
                  <p style={{ color: "#747d8c", fontSize: "0.9rem" }}>
                    {movie.description?.substring(0, 100)}...
                  </p>
                </div>

                {/* Laboratorio 11: Renderizado condicional basado en autenticación */}
                {user && (
                  <div style={{ padding: "15px", background: "#f1f2f6", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                    <button
                      onClick={() => navigate(`/movies/${movie.id}/edit`)}
                      style={{ padding: "8px 15px", borderRadius: "5px", border: "none", backgroundColor: "#3742fa", color: "white", cursor: "pointer" }}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      style={{ padding: "8px 15px", borderRadius: "5px", border: "none", backgroundColor: "#ff4757", color: "white", cursor: "pointer" }}
                    >
                      🗑️ Borrar
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", gridColumn: "1/-1" }}>
              <h3>No se encontraron películas.</h3>
              <p>Intenta agregar una nueva si estás logueado.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}