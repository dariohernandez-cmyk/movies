import { useState } from "react";
import { createMovie } from "../api/movies.api";
import { useNavigate } from "react-router-dom";

export function MoviesFormPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [movie, setMovie] = useState({
    title: "",
    director_name: "",
    genre: "",
    publication_year: "",
    synopsis: "",
    image: null,
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setMovie({ ...movie, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(movie).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    await createMovie(formData);
    setLoading(false);
    navigate("/movies");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-lg shadow-2xl bg-base-100"
      >
        <div className="card-body space-y-6">
          <h2 className="card-title text-3xl font-bold text-primary justify-center">
            🎬 Agregar Película
          </h2>

          {/* Título */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Título</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Ingrese el título"
              onChange={handleChange}
              required
              className="input input-bordered input-primary"
            />
          </div>

          {/* Director */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Director</span>
            </label>
            <input
              type="text"
              name="director_name"
              placeholder="Nombre del director"
              onChange={handleChange}
              required
              className="input input-bordered input-primary"
            />
          </div>

          {/* Género */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Género</span>
            </label>
            <input
              type="text"
              name="genre"
              placeholder="Género de la película"
              onChange={handleChange}
              required
              className="input input-bordered input-primary"
            />
          </div>

          {/* Año */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Año de publicación</span>
            </label>
            <input
              type="number"
              name="publication_year"
              placeholder="Ej: 2026"
              onChange={handleChange}
              required
              className="input input-bordered input-primary"
            />
          </div>

          {/* Sinopsis */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Sinopsis</span>
            </label>
            <textarea
              name="synopsis"
              placeholder="Descripción de la película"
              onChange={handleChange}
              required
              className="textarea textarea-bordered textarea-primary h-32"
            />
          </div>

          {/* Imagen */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Imagen</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered file-input-primary w-full"
            />
            {movie.image && (
              <img
                src={URL.createObjectURL(movie.image)}
                alt="Previsualización"
                className="mt-3 rounded-xl shadow-md max-h-48 object-cover"
              />
            )}
          </div>

          {/* Botón */}
          <div className="form-control mt-6">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg w-full"
            >
              {loading ? "⏳ Guardando..." : "💾 Guardar Película"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}