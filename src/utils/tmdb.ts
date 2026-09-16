const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies(page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=${page}`
  );

  if (!res.ok) {
    throw new Error("Erreur TMDB");
  }

  return res.json();
}

export async function searchMovies(query: string) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=fr-FR`);
  return res.json();
}

export async function fetchMovieDetails(id: number) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`);
  return res.json();
}

export async function fetchMovieCredits(id: number) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`
  );
  return res.json();
}
