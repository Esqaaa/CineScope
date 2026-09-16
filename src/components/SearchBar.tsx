import { useState } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";
import MovieCard from "../components/MovieCard";
import "../styles/SearchBar.css";

interface SearchBarProps {
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  library: number[];
  setLibrary: React.Dispatch<React.SetStateAction<number[]>>;
}

function SearchBar({
  favorites,
  setFavorites,
  library,
  setLibrary,
}: SearchBarProps) {
  const [search, setSearch] = useState<string>("");
  const { results, loading, error } = useSearchMovies(search);

  const showResults = search.length > 0;

  return (
    <section className="content-page">
      <h2>Films</h2>

      <input
        type="text"
        placeholder="Rechercher un film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading && <p>Chargement...</p>}
      {error && <p>Erreur lors de la recherche</p>}

      {!showResults && (
        <p className="search-info">Tapez un nom pour rechercher un film.</p>
      )}

      {showResults && results.length > 0 && (
        <div className="movie-grid">
          {results.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
              favorites={favorites}
              setFavorites={setFavorites}
              library={library}
              setLibrary={setLibrary}
            />
          ))}
        </div>
      )}

      {showResults && results.length === 0 && (
        <p className="no-results">
          Aucun film ne correspond à votre recherche.
        </p>
      )}
    </section>
  );
}

export default SearchBar;
