export interface Movie {
  id: number;
  title: string;
  poster: string | null;
  releaseDate: string;
  rating: number;
  votes: number;
  duration: number;
  language: string;
  countries: string[];
  description: string;
}

export interface Actor {
  id: number;
  name: string;
  character: string;
  profile: string;
}
