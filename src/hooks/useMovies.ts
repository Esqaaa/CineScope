import { useEffect, useState, useCallback } from "react";
import { fetchPopularMovies } from "../utils/tmdb";
import { convertTMDB } from "../utils/tmdbConverter";
import type { Movie } from "../utils/types";

export function useMovies(page: number) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const loadMovies = useCallback(() => {
    let isCancelled = false;
    setLoading(true);
    setError(false);

    fetchPopularMovies(page)
      .then((data) => {
        if (isCancelled) return;
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

  useEffect(() => {
    const cleanup = loadMovies();
    return cleanup;
  }, [loadMovies]);

  return { movies, loading, error, totalPages, refetch: loadMovies };
}