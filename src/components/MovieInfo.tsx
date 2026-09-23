import type { Movie } from "../utils/types";

interface MovieInfoProps {
  movie: Movie;
}

// Affichage infos détaillées
function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div>
      <h2>{movie.title}</h2>

      {/* Métadonnées principales */}
      <div className="movie-info">
        <p>
          <strong>Année :</strong> {movie.releaseDate}
        </p>
        <p>
          <strong>Note :</strong> {movie.rating}
        </p>
        <p>
          <strong>Durée :</strong> {movie.duration} min
        </p>
      </div>

      {/* Liste des genres */}
      <div className="genres">
        {movie.genres.map((g: string) => (
          <span key={g} className="genre-badge">
            {g}
          </span>
        ))}
      </div>

      <div className="movie-description">{movie.description}</div>
    </div>
  );
}

export default MovieInfo;
