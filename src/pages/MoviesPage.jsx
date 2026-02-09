import { MoviesList } from "../components/movieslist";

export function MoviesPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🎬 Movies</h1>
      <MoviesList />
    </div>
  );
}