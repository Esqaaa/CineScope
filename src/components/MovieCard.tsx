import { Link } from "react-router-dom";
import type { Movie } from "../utils/types";
import "../styles/MovieCard.css";

import { useFavorites } from "../context/FavoritesContext";
import { useLibrary } from "../context/LibraryContext";

interface MovieCardProps extends Movie {
  isLibrary?: boolean;
}

// Nom des statuts
const STATUS_LABELS: Record<string, string> = {
  towatch: "À regarder",
  inprogress: "En cours",
  watched: "Vu",
};

// Carte de film avec favoris, statut et suppression de bibliothèque
function MovieCard({ id, title, poster, releaseDate, isLibrary = false }: MovieCardProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { library, addToLibrary, setStatus, removeFromLibrary } = useLibrary();

  // Statut actuel du film
  const currentStatus = library[id];

  // Bascule le favori
  function handleFavorite() {
    isFavorite(id) ? removeFavorite(id) : addFavorite(id);
  }

  // Gestion du changement de catégorie ou suppression
  function handleCategoryChange(value: string) {
    if (!value) return;

    if (value === "remove") {
      removeFromLibrary(id);
      return;
    }

    addToLibrary(id);
    setStatus(id, value as "towatch" | "inprogress" | "watched");
  }

  return (
    <div className="movie-card">
      <div className="poster-container">
        {poster ? (
          <img src={poster} alt={title} />
        ) : (
          <div className="no-poster">Affiche indisponible</div>
        )}

        {/* Badge de statut si en bibliothèque */}
        {isLibrary && currentStatus && (
          <span className={`status-badge status-${currentStatus}`}>
            {STATUS_LABELS[currentStatus]}
          </span>
        )}
      </div>

      <h3>{title}</h3>
      <p>{releaseDate}</p>

      {/* Mode Hors Bibliothèque (Recherche / Catalogue) */}
      {!isLibrary && (
        <>
          <button onClick={handleFavorite}>
            {isFavorite(id) ? "Retirer des favoris" : "Ajouter aux favoris"}
          </button>

          <select
            className="category-select"
            value={currentStatus || ""}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">Catégorie...</option>
            <option value="towatch">À regarder</option>
            <option value="inprogress">En cours</option>
            <option value="watched">Vu</option>
          </select>
        </>
      )}

      {/* Mode Bibliothèque : Changement de statut + Bouton de suppression */}
      {isLibrary && (
        <>
          <select
            className="category-select"
            value={currentStatus || "towatch"}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="towatch">À regarder</option>
            <option value="inprogress">En cours</option>
            <option value="watched">Vu</option>
          </select>

          <button className="remove-library-btn" onClick={() => removeFromLibrary(id)}>
            Retirer de la bibliothèque
          </button>
        </>
      )}

      <Link to={`/film/${id}`}>
        <button className="view-button">Voir le film</button>
      </Link>
    </div>
  );
}

export default MovieCard;