import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { useSearchMovies } from "../hooks/useSearchMovies";
import MovieCard from "../components/MovieCard";
import "../styles/Films.css";
import "../styles/SearchBar.css";

interface FilmsProps {
  favorites?: number[];
  setFavorites?: React.Dispatch<React.SetStateAction<number[]>>;
  library?: number[];
  setLibrary?: React.Dispatch<React.SetStateAction<number[]>>;
}

function Films({
  favorites = [],
  setFavorites = () => {},
  library = [],
  setLibrary = () => {},
}: FilmsProps) {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);

  // Données des films populaires
  const { movies: popularMovies, loading: loadingPopular, error: errorPopular, totalPages, refetch } = useMovies(page);

  // Données de la recherche
  const { results: searchResults, loading: loadingSearch, error: errorSearch } = useSearchMovies(search);

  const isSearching = search.trim().length > 0;

  return (
    <section className="content-page">
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* --- CAS 1 : MODE RECHERCHE --- */}
      {isSearching ? (
        <>
          <h2>Résultats de la recherche</h2>

          {loadingSearch && <p>Recherche en cours...</p>}
          {errorSearch && <p className="error-block">Erreur lors de la recherche</p>}

          {!loadingSearch && searchResults.length > 0 && (
            <div className="movie-grid">
              {searchResults.map((movie) => (
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

          {!loadingSearch && searchResults.length === 0 && (
            <p className="no-results">
              Aucun film ne correspond à votre recherche.
            </p>
          )}
        </>
      ) : (
        /* --- CAS 2 : MODE POPULAIRES (PAR DÉFAUT) --- */
        <>
          <h2>Films populaires</h2>

          {loadingPopular && <div className="loading">Chargement des films...</div>}
          
          {errorPopular && (
            <div className="error-block">
              <p>Erreur lors du chargement</p>
              <button className="retry-button" onClick={refetch}>
                Réessayer
              </button>
            </div>
          )}

          {!loadingPopular && !errorPopular && (
            <>
              <div className="movie-grid">
                {popularMovies.map((movie) => (
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

              <div className="pagination">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Page précédente
                </button>

                <span className="page-info">
                  Page {page} sur {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Page suivante
                </button>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default Films;