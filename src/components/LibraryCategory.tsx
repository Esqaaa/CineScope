import type { Movie } from "../utils/types";
import MovieCard from "./MovieCard";

interface LibraryCategoryProps {
  title: string;
  movies: Movie[];
}

// Affiche une catégorie de films de la bibliothèque (ex: À voir, Vus)
export function LibraryCategory({ title, movies }: LibraryCategoryProps) {
  return (
    <section className="library-category">
      <h3>{title}</h3>

      {/* Message de liste vide ou grille de films */}
      {movies.length === 0 ? (
        <p className="empty-category">Aucun film dans cette liste.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} isLibrary={true} />
          ))}
        </div>
      )}
    </section>
  );
}