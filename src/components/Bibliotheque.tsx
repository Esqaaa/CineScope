import "../styles/Bibliotheque.css";
import type { Movie } from "../utils/types";
import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../utils/tmdb";
import { convertTMDB } from "../utils/tmdbConverter";
import MovieCard from "../components/MovieCard";

import { useFavorites } from "../context/FavoritesContext";
import { useLibrary } from "../context/LibraryContext";

function Bibliotheque() {
  const { favorites } = useFavorites();
  const { library } = useLibrary();

  const [libraryMovies, setLibraryMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadLibrary() {
      const results: Movie[] = [];

      for (const id of Object.keys(library)) {
        const data = await fetchMovieDetails(Number(id));
        if (data) {
          results.push(convertTMDB(data));
        }
      }

      setLibraryMovies(results);
    }

    loadLibrary();
  }, [library]);

  function renderCategory(title: string, status: "towatch" | "inprogress" | "watched") {
    const films = libraryMovies.filter((m) => library[m.id] === status);

    return (
      <section className="library-category">
        <h3>{title}</h3>

        {films.length === 0 ? (
          <p className="empty-category">Aucun film dans cette liste.</p>
        ) : (
          <div className="movie-grid">
            {films.map((movie) => (
              <MovieCard key={movie.id} {...movie} isLibrary={true} />
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="library-page">
      <h2>Ma bibliothèque</h2>

      <div className="library-columns">
        <div className="library-block">
          {renderCategory("À regarder", "towatch")}
        </div>

        <div className="library-block">
          {renderCategory("En cours", "inprogress")}
        </div>

        <div className="library-block">
          {renderCategory("Vu", "watched")}
        </div>
      </div>
    </section>
  );
}

export default Bibliotheque;