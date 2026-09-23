import { Link } from "react-router-dom";
import type { Movie } from "../utils/types";

interface MovieActionsProps {
  movie: Movie;
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
}

// Composant qui gère le retour et basculement des favoris
function MovieActions({ movie, favorites, setFavorites }: MovieActionsProps) {
  // Ajoute ou retire des favoris
  function toggleFavorite() {
    if (favorites.includes(movie.id)) {
      setFavorites(favorites.filter((f: number) => f !== movie.id));
    } else {
      setFavorites([...favorites, movie.id]);
    }
  }

  return (
    <div className="movie-actions">
      {/* Lien de retour aux films */}
      <Link to="/films">
        <button className="back-button">Retour aux films</button>
      </Link>

      {/* Bouton dynamique Ajout/Retrait */}
      <button className="fav-button" onClick={toggleFavorite}>
        {favorites.includes(movie.id)
          ? "Retirer des favoris"
          : "Ajouter aux favoris"}
      </button>
    </div>
  );
}

export default MovieActions;
