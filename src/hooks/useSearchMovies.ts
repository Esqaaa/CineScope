import { useEffect, useState } from "react";
import { searchMovies } from "../utils/tmdb";
import { convertTMDB } from "../utils/tmdbConverter";
import type { Movie } from "../utils/types";

export function useSearchMovies(query: string) {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Requête vide -> pas d'appel API
    if (!query) return;

    setLoading(true);
    setError(false);

    searchMovies(query)
      .then((data) => {
        // Sécurité si API renvoie réponse invalide ou 0 résultats
        if (!data || !data.results) {
          setResults([]);
          setLoading(false);
          return;
        }

        // Conversion résultats TMDB au format de l'app
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
