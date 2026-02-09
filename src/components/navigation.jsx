import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function Navigation() {
  const { user, logout } = useAuth();

  const handleLogin = () => {
    // Redirige al login normal en tu frontend
    window.location.href = "/login";
  };

  return (
    <nav className="flex gap-4 p-4 bg-gray-100 justify-center">
      <Link to="/movies" className="btn btn-primary">
        Movies
      </Link>

      {/* Mostrar Add Movie solo si hay usuario */}
      {user && (
        <Link to="/movies/form" className="btn btn-success">
          Add Movie
        </Link>
      )}

      {/* Botón Login o Logout */}
      {!user ? (
        <button onClick={handleLogin} className="btn btn-outline">
          Login
        </button>
      ) : (
        <button onClick={logout} className="btn btn-error">
          Logout
        </button>
      )}
    </nav>
  );
}
