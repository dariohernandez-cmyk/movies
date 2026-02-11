import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MoviesPage } from "./pages/MoviesPage";
import { MoviesFormPage } from "./pages/MoviesFormPage";
import { LoginPage } from "./pages/LoginPage"; // Crea este archivo si no existe
import { Navigation } from "./components/Navigation";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas Protegidas (Solo tras Login) */}
        <Route
          path="/movies/form"
          element={
            <ProtectedRoute>
              <MoviesFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/:id/edit"
          element={
            <ProtectedRoute>
              <MoviesFormPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;