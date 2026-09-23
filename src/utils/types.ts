// Interface représentant un film dans l'application
export interface Movie {
  id: number;
  title: string;
  genres: string[];
  poster: string | null;
  releaseDate: string;
  rating: number;
  votes: number;
  duration: number;
  language: string;
  countries: string[];
  description: string;
}

// Interface représentant un acteur
export interface Actor {
  id: number;
  name: string;
  character: string;
  profile: string;
}
