import { useEffect, useState, useCallback } from "react";
import { fetchPopularMovies } from "../utils/tmdb";
import { convertTMDB } from "../utils/tmdbConverter";
import type { Movie } from "../utils/types";

// Récupérer liste paginée
export function useMovies(page: number) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // Fonction de chargement avec useCallback -> éviter réexécutions inutiles
  const loadMovies = useCallback(() => {
    let isCancelled = false;
    setLoading(true);
    setError(false);

    fetchPopularMovies(page)
      .then((data) => {
        if (isCancelled) return;
        // Conversion résultats TMDB au format de l'app
        setMovies(data.results.map(convertTMDB));
        setTotalPages(data.total_pages);
      })
      .catch(() => {
        if (!isCancelled) setError(true);
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [page]);

  // Déclenche le chargement à chaque changement de page
  useEffect(() => {
    const cleanup = loadMovies();
    return cleanup;
  }, [loadMovies]);

  return { movies, loading, error, totalPages, refetch: loadMovies };
}