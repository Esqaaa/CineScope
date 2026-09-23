import "../styles/MoviePage.css";
import { useParams, Link } from "react-router-dom";
import ActorCard from "../components/ActorCard";
import { Rating } from "../components/Rating";

import { useFavorites } from "../context/FavoritesContext";
import { useMovieDetails } from "../hooks/useMovieDetails";

// Page de détails d'un film
function MoviePage() {
  const { id } = useParams();
  const { movie, actors, loading, error } = useMovieDetails(Number(id));

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Gestion des favoris
  function toggleFavorite() {
    if (!movie) return;
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie.id);
    }
  }

  // Écran de chargement
  if (loading) {
    return <div className="loading">Chargement du film...</div>;
  }

  // Erreur de chargement
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
      {/* Bouton retour */}
      <div className="back-wrapper">
        <Link to="/film">
          <button className="back-button">Retour aux films</button>
        </Link>
      </div>

      {/* Détails du film */}
      <div className="movie-header">
        <img src={movie.poster ?? ""} alt={movie.title} />

        <div className="movie-page-content">
          <h2>{movie.title}</h2>

          {/* Métadonnées */}
          <div className="movie-info">
            <p>
              <strong>Année :</strong> {movie.releaseDate}
            </p>
            <p>
              <strong>Note TMDB :</strong> {movie.rating}
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

          {/* Notation personnelle par étoiles */} <br />
          <div style={{ margin: "15px 0", textAlign: "center" }}>
            <strong>Votre note :</strong>
            <Rating movieId={movie.id} />
          </div>

          {/* Action favoris */}
          <button className="fav-button" onClick={toggleFavorite}>
            {isFavorite(movie.id) ? "Retirer des favoris" : "Ajouter aux favoris"}
          </button>

          <div className="movie-description">{movie.description}</div>
        </div>
      </div>

      {/* Liste des acteurs */}
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