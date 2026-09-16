import { useState } from "react";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import "../styles/Films.css";

function Films() {
  const [page, setPage] = useState(1);
  const { movies, loading, error, totalPages } = useMovies(page);

  if (loading) return <div className="loading">Chargement des films...</div>;
  if (error)
    return <div className="error-block">Erreur lors du chargement</div>;

  return (
    <section className="content-page">
      <h2>Films populaires</h2>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
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
    </section>
  );
}

export default Films;
