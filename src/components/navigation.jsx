import { Link } from "react-router-dom";
import { FilmIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

export function Navigation() {
  return (
    <nav className="flex gap-4 p-3 bg-gray-100 rounded-lg shadow-md justify-center">
      <Link
        to="/movies"
        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 
                   text-white font-medium rounded-lg shadow hover:scale-105 hover:from-blue-600 
                   hover:to-indigo-700 transition-transform duration-200"
      >
        <FilmIcon style={{ width: "50px", height: "50px" }} />
        Movies
      </Link>

      <Link
        to="/movies/form"
        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 
                   text-white font-medium rounded-lg shadow hover:scale-105 hover:from-green-600 
                   hover:to-emerald-700 transition-transform duration-200"
      >
        <PlusCircleIcon style={{ width: "50px", height: "50px" }} />
        Add Movie
      </Link>
    </nav>
  );
}
