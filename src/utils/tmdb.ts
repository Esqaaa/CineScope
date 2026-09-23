// Récupération clé API + URL
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Récupère films de manière paginée
export async function fetchPopularMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`
  );

  if (!res.ok) {
    throw new Error("Erreur TMDB");
  }

  return res.json();
}

// Recherche par mots-clés
export async function searchMovies(query: string) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=fr-FR`);
  return res.json();
}

// Récupère les détails complets d'un film grâce à son ID
export async function fetchMovieDetails(id: number) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
  return res.json();
}

// Récupère liste des acteurs
export async function fetchMovieCredits(id: number) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`
  );
  return res.json();
}
