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

    fetchMovieDetails(id)
      .then((data) => {
        if (!data || data.success === false) {
          setMovie(null);
          setLoading(false);
          return;
        }

        setMovie(convertTMDB(data));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    fetchMovieCredits(id)
      .then((data) => setActors(convertActors(data)))
      .catch(() => {});
  }, [id]);

  return { movie, actors, loading, error };
}
