import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../utils/tmdb";
import { convertTMDB } from "../utils/tmdbConverter";
import MovieCard from "../components/MovieCard";
import "../styles/Favorites.css";
import type { Movie } from "../utils/types";

import { useFavorites } from "../context/FavoritesContext";

// Page qui affiche les favoris
function Favoris() {
  // Récupération des IDs 
  const { favorites } = useFavorites();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Charge les détails du film favori
  useEffect(() => {
    async function loadFavorites() {
      setLoading(true);

      // Aucun favori -> on vide la liste et stop chargement
      if (favorites.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      const results: Movie[] = [];

      for (const id of favorites) {
        const data = await fetchMovieDetails(id);
        results.push(convertTMDB(data));
      }

      setMovies(results);
      setLoading(false);
    }

    loadFavorites();
  }, [favorites]);

  // Ecran de chargement pendant le chargement 
  if (loading) {
    return <div className="loading">Chargement des favoris...</div>;
  }

  return (
    <section className="favorites-page">
      <h2>Mes Favoris</h2>

      {/* Si liste vide -> message */}
      {favorites.length === 0 && (
        <div className="no-favorites">
          <p>Tu n’as encore ajouté aucun film en favori.</p>
          <p>Va dans la page Films et clique sur “Ajouter aux favoris”.</p>

          <a href="/film" className="go-films">
            Voir les films
          </a>
        </div>
      )}

      {/* Grille des favoris */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </section>
  );
}

export default Favoris;
