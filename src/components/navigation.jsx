import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navStyle = {
    padding: "1rem 2rem",
    background: "#1a1a1a",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white"
  };

  return (
    <nav style={navStyle}>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* BOTÓN VISIBLE POR DEFECTO */}
        <Link to="/movies" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          🎬 Ver Películas
        </Link>

        {/* BOTÓN AÑADIR (Solo aparece si hay Login) */}
        {user && (
          <Link to="/movies/form" style={{ color: "#2ed573", textDecoration: "none", fontWeight: "bold" }}>
            ➕ Añadir Película
          </Link>
        )}
      </div>

      <div>
        {/* BOTÓN LOGIN (Visible si NO hay usuario) */}
        {!user ? (
          <Link 
            to="/login" 
            style={{ background: "#3742fa", padding: "8px 15px", borderRadius: "5px", color: "white", textDecoration: "none" }}
          >
            🔑 Login
          </Link>
        ) : (
          /* BOTÓN CERRAR SESIÓN (Visible si hay usuario) */
          <button 
            onClick={handleLogout}
            style={{ background: "#ff4757", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}
          >
            Cerrar Sesión
          </button>
        )}
      </div>
    </nav>
  );
}