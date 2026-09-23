import MovieCard from "../components/MovieCard";
import { movies } from "../utils/movies";
import type { Movie } from "../utils/types";

interface MovieGridProps {
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
}

// Grille d'affichage films
function MovieGrid({ favorites, setFavorites }: MovieGridProps) {
  return (
    <div className="movie-grid">
      {/* Rendu dynamique des cartes */}
      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.id}
          {...movie}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
