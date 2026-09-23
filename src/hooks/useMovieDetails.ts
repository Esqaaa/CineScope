import { useEffect, useState } from "react";
import { fetchMovieDetails, fetchMovieCredits } from "../utils/tmdb";
import { convertTMDB, convertActors } from "../utils/tmdbConverter";
import type { Movie, Actor } from "../utils/types";

export function useMovieDetails(id: number) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    // Récupération infos du film
    fetchMovieDetails(id)
      .then((data) => {
        // Traitement si API renvoie film inexistant
        if (!data || data.success === false) {
          setMovie(null);
          setLoading(false);
          return;
        }

        // Conversion données TMDB au format de l'app
        setMovie(convertTMDB(data));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    // Récupération casting du film
    fetchMovieCredits(id)
      .then((data) => setActors(convertActors(data)))
      .catch(() => {
        // En cas d'échec, on conserve tableau vide
      });
  }, [id]);

  return { movie, actors, loading, error };
}
