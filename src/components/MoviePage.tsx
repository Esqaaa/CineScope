import "../styles/MoviePage.css";
import { useParams, Link } from "react-router-dom";
import ActorCard from "../components/ActorCard";

import { useFavorites } from "../context/FavoritesContext";
import { useLibrary } from "../context/LibraryContext";

import { useMovieDetails } from "../hooks/useMovieDetails";

// Détails d'un film
function MoviePage() {
  const { id } = useParams();
  const { movie, actors, loading, error } = useMovieDetails(Number(id));

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { library, addToLibrary, setStatus } = useLibrary();

  // Gestion favoris
  function toggleFavorite() {
    if (isFavorite(movie!.id)) {
      removeFavorite(movie!.id);
    } else {
      addFavorite(movie!.id);
    }
  }

  // Chargement
  if (loading) {
    return <div className="loading">Chargement du film...</div>;
  }

  // Erreur réseau
  if (error) {
    return (
      <div className="error-block">
        <p>Impossible de charger ce film.</p>
      </div>
    );
  }

  // Film introuvable
  if (!movie) {
    return (
      <div className="error-block">
        <p>Film introuvable</p>
        <p>Le film demandé n'existe pas ou n'est plus disponible.</p>
      </div>
    );
  }

  return (
    <section className="movie-page">
      {/* Bouton de retour */}
      <div className="back-wrapper">
        <Link to="/film">
          <button className="back-button">Retour aux films</button>
        </Link>
      </div>

      {/* Informations principales et affiche */}
      <div className="movie-header">
        <img src={movie.poster ?? ""} alt={movie.title} />

        <div className="movie-page-content">
          <h2>{movie.title}</h2>

          {/* Métadonnées du film */}
          <div className="movie-info">
            <p>
              <strong>Année :</strong> {movie.releaseDate}
            </p>
            <p>
              <strong>Note :</strong> {movie.rating}
            </p>
            <p>
              <strong>Votes :</strong> {movie.votes}
            </p>
            <p>
              <strong>Durée :</strong> {movie.duration} min
            </p>
            <p>
              <strong>Langue originale :</strong> {movie.language}
            </p>
            <p>
              <strong>Pays :</strong> {movie.countries.join(", ")}
            </p>
          </div>

          <button className="fav-button" onClick={toggleFavorite}>
            {isFavorite(movie.id)
              ? "Retirer des favoris"
              : "Ajouter aux favoris"}
          </button>

          <div className="movie-description">{movie.description}</div>
        </div>
      </div>

      {/* Section des acteurs */}
      <div className="actors-section">
        <h3>Acteurs</h3>
        <div className="actors-grid">
          {actors.map((actor) => (
            <ActorCard key={actor.id} {...actor} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MoviePage;
