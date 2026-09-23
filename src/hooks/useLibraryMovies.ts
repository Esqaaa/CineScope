import { useState, useEffect } from "react";
import type { Movie } from "../utils/types";
import { fetchMovieDetails } from "../utils/tmdb";
import { convertTMDB } from "../utils/tmdbConverter";
import { useLibrary } from "../context/LibraryContext";

// Hook chargeant détails du film 
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
        // Lance les requêtes API 
        const promises = ids.map((id) => fetchMovieDetails(Number(id)));
        const results = await Promise.all(promises);

        if (!isCancelled) {
          // Filtre les réponses valides + convertisseur TMDB
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

    // Fonction de nettoyage
    return () => {
      isCancelled = true;
    };
  }, [library]);

  // Filtre selon le statut
  const getMoviesByStatus = (status: "towatch" | "inprogress" | "watched") => {
    return libraryMovies.filter((movie) => library[movie.id] === status);
  };

  return { getMoviesByStatus, loading };
}