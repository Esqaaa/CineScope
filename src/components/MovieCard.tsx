import { Link } from "react-router-dom";
import type { Movie } from "../utils/types";
import "../styles/MovieCard.css";

import { useFavorites } from "../context/FavoritesContext";
import { useLibrary } from "../context/LibraryContext";

function MovieCard({ id, title, poster, releaseDate }: Movie) {

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { addToLibrary, setStatus } = useLibrary();

  function handleFavorite() {
    isFavorite(id) ? removeFavorite(id) : addFavorite(id);
  }

  function handleCategoryChange(value: string) {
    if (!value) return;
    addToLibrary(id);
    setStatus(id, value as "towatch" | "inprogress" | "watched");
  }

  return (
    <div className="movie-card">
      {poster ? (
        <img src={poster} alt={title} />
      ) : (
        <div className="no-poster">Affiche indisponible</div>
      )}

      <h3>{title}</h3>
      <p>{releaseDate}</p>

      <button onClick={handleFavorite}>
        {isFavorite(id) ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>

      <select
        className="category-select"
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">Catégorie...</option>
        <option value="towatch">À regarder</option>
        <option value="inprogress">En cours</option>
        <option value="watched">Vu</option>
      </select>

      <Link to={`/film/${id}`}>
        <button className="view-button">Voir le film</button>
      </Link>
    </div>
  );
}

export default MovieCard;
