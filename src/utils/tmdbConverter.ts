import type { Movie, Actor } from "../utils/types";

interface TMDBGenre {
  id: number;
  name: string;
}

interface TMDBCountry {
  iso_3166_1: string;
  name: string;
}

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number | null;
  genres: TMDBGenre[];
  overview: string;
  original_language: string;
  production_countries: TMDBCountry[];
}

interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface TMDBCredits {
  cast: TMDBCastMember[];
}

export function convertTMDB(movie: unknown): Movie {
  const m = movie as TMDBMovie;

  return {
    id: m.id,
    title: m.title,
    poster: m.poster_path
      ? "https://image.tmdb.org/t/p/w500" + m.poster_path
      : "",
    releaseDate: parseInt(m.release_date?.slice(0, 4) || "0"),
    rating: m.vote_average,
    votes: m.vote_count,
    duration: m.runtime ?? 0,
    genres: m.genres?.map((g) => g.name) ?? [],
    description: m.overview,
    language: m.original_language,
    countries: m.production_countries?.map((c) => c.name) ?? [],
  };
}

export function convertActors(data: unknown): Actor[] {
  const d = data as TMDBCredits;

  return d.cast
    .filter((a) => a.profile_path)
    .slice(0, 10)
    .map((a) => ({
      id: a.id,
      name: a.name,
      character: a.character,
      profile: "https://image.tmdb.org/t/p/w300" + a.profile_path,
    }));
}
