import { Link } from "react-router-dom";
import type { Movie } from "../utils/types";

interface MovieActionsProps {
  movie: Movie;
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
}

function MovieActions({ movie, favorites, setFavorites }: MovieActionsProps) {
  function toggleFavorite() {
    if (favorites.includes(movie.id)) {
      setFavorites(favorites.filter((f: number) => f !== movie.id));
    } else {
      setFavorites([...favorites, movie.id]);
    }
  }

  return (
    <div className="movie-actions">
      <Link to="/movies">
        <button className="back-button">Retour aux films</button>
      </Link>

      <button className="fav-button" onClick={toggleFavorite}>
        {favorites.includes(movie.id)
          ? "Retirer des favoris"
          : "Ajouter aux favoris"}
      </button>
    </div>
  );
}

export default MovieActions;
