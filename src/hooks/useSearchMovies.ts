import { useEffect, useState } from "react";
import { searchMovies } from "../utils/tmdb";
import { convertTMDB } from "../utils/tmdbConverter";
import type { Movie } from "../utils/types";

export function useSearchMovies(query: string) {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setError(false);

    searchMovies(query)
      .then((data) => {
        if (!data || !data.results) {
          setResults([]);
          setLoading(false);
          return;
        }

        const converted = data.results.map(convertTMDB);
        setResults(converted);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [query]);

  return { results, loading, error };
}
