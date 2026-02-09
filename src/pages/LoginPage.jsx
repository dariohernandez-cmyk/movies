import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export function LoginPage() {
  const { login } = useAuth(); // Usamos la función login del contexto
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(username, password); // login maneja token y user
      if (success) {
        navigate("/movies"); // Redirigimos si login fue exitoso
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error en login:", err);
      alert("Ocurrió un error, intente de nuevo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md shadow-2xl bg-base-100"
      >
        <div className="card-body space-y-4">
          <h2 className="card-title text-3xl font-bold text-primary justify-center">
            🔐 Iniciar Sesión
          </h2>

          {/* Usuario */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Usuario</span>
            </label>
            <input
              type="text"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input input-bordered input-primary"
            />
          </div>

          {/* Contraseña */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Contraseña</span>
            </label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered input-primary"
            />
          </div>

          {/* Botón */}
          <div className="form-control mt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg w-full"
            >
              {loading ? "⏳ Iniciando sesión..." : "🔑 Iniciar Sesión"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
