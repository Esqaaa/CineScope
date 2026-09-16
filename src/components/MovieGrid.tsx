import MovieCard from "../components/MovieCard";
import { movies } from "../utils/movies";
import type { Movie } from "../utils/types";

interface MovieGridProps {
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
}

function MovieGrid({ favorites, setFavorites }: MovieGridProps) {
  return (
    <div className="movie-grid">
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
