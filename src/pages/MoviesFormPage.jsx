import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMovie, getMovieById, editMovie } from "../api/movies.api";
import { useAuth } from "../context/useAuth";

export function MoviesFormPage() {
  const { id } = useParams(); // Si hay ID, estamos editando
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({
    title: "",
    director_name: "",
    genre: "",
    publication_year: "",
    synopsis: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Cargar datos si estamos editando
  useEffect(() => {
    if (id) {
      async function loadMovie() {
        try {
          const res = await getMovieById(id);
          setMovie({
            title: res.title,
            director_name: res.director_name,
            genre: res.genre,
            publication_year: res.publication_year,
            synopsis: res.synopsis,
            image: null, // no cargamos imagen por seguridad
          });
        } catch (err) {
          console.error("Error al cargar la película:", err);
          alert("No se pudo cargar la película");
          navigate("/movies");
        }
      }
      loadMovie();
    }
  }, [id, navigate]);

  // Preview de imagen
  useEffect(() => {
    if (!movie.image) return;
    const objectUrl = URL.createObjectURL(movie.image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [movie.image]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMovie({ ...movie, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(movie).forEach(([key, value]) => {
        if (value !== null && value !== "") formData.append(key, value);
      });

      if (id) {
        await editMovie(id, formData);
      } else {
        await createMovie(formData);
      }
      navigate("/movies");
    } catch (err) {
      console.error("Error al guardar:", err);
      alert("No se pudo guardar la película");
    } finally {
      setLoading(false);
    }
  };

  // 🚨 Si no hay usuario logueado, redirigir
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-lg shadow-2xl bg-base-100"
        encType="multipart/form-data"
      >
        <div className="card-body space-y-6">
          <h2 className="card-title text-3xl font-bold text-primary justify-center">
            {id ? "✏️ Editar Película" : "🎬 Agregar Película"}
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
              value={movie.title}
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
              value={movie.director_name}
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
              value={movie.genre}
              onChange={handleChange}
              required
              className="input input-bordered input-primary"
            />
          </div>

          {/* Año de publicación */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Año de publicación</span>
            </label>
            <input
              type="number"
              name="publication_year"
              placeholder="Ej: 2026"
              min="1800"
              value={movie.publication_year}
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
              value={movie.synopsis}
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
            {preview && (
              <img
                src={preview}
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
              {loading
                ? "⏳ Guardando..."
                : id
                ? "💾 Actualizar Película"
                : "💾 Guardar Película"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
