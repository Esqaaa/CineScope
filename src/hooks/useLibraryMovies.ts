import { useState, useEffect } from "react";
import type { Movie } from "../utils/types";
import { fetchMovieDetails } from "../utils/tmdb";
import { convertTMDB } from "../utils/tmdbConverter";
import { useLibrary } from "../context/LibraryContext";

export function useLibraryMovies() {
  const { library } = useLibrary();
  const [libraryMovies, setLibraryMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isCancelled = false;

    async function loadLibrary() {
      setLoading(true);
      const ids = Object.keys(library);

      try {
        const promises = ids.map((id) => fetchMovieDetails(Number(id)));
        const results = await Promise.all(promises);

        if (!isCancelled) {
          const validMovies = results
            .filter((data) => data && data.success !== false)
            .map((data) => convertTMDB(data));

          setLibraryMovies(validMovies);
        }
      } catch (err) {
        console.error("Erreur lors du chargement de la bibliothèque", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    loadLibrary();

    return () => {
      isCancelled = true;
    };
  }, [library]);

  const getMoviesByStatus = (status: "towatch" | "inprogress" | "watched") => {
    return libraryMovies.filter((movie) => library[movie.id] === status);
  };

  return { getMoviesByStatus, loading };
}