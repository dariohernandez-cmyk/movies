import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MoviesPage } from "./pages/MoviesPage";
import { MoviesFormPage } from "./pages/MoviesFormPage";
import { Navigation } from "./components/Navigation";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies" element={<MoviesPage />} />

        <Route
          path="/movies/form"
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
