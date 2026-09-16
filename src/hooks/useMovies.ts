import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../utils/tmdb";
import { convertTMDB } from "../utils/tmdbConverter";
import type { Movie } from "../utils/types";

export function useMovies(page: number) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetchPopularMovies(page)
      .then((data) => {
        setMovies(data.results.map(convertTMDB));
        setTotalPages(data.total_pages);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [page]);

  return { movies, loading, error, totalPages };
}
