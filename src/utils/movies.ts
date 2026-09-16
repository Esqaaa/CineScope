import type { Movie } from "../utils/types";

export const movies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    poster: "/interstellar.jpg",
    releaseDate: 2014,
    rating: 8.7,
    genres: ["Science-fiction", "Drame", "Aventure"],
    duration: 169,
    description:
      "Une équipe d'explorateurs voyage à travers un trou de ver afin de trouver une nouvelle planète habitable pour l'humanité.",
  },
  {
    id: 2,
    title: "Inception",
    poster: "/inception.jpg",
    releaseDate: 2010,
    rating: 8.8,
    genres: ["Action", "Science-fiction", "Thriller"],
    duration: 148,
    description:
      "Un spécialiste de l'extraction de secrets pénètre dans les rêves d'autres personnes et reçoit une mission particulièrement difficile.",
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "/darkknight.jpg",
    releaseDate: 2008,
    rating: 9.0,
    genres: ["Drame", "Action", "Crime"],
    duration: 152,
    description:
      "Batman affronte un criminel qui cherche à plonger Gotham City dans le chaos.",
  },

  // Les autres films peuvent rester comme avant
  {
    id: 4,
    title: "The Matrix",
    poster: "/matrix.jpg",
    releaseDate: 1999,
    rating: 8.7,
    genres: [],
    duration: 0,
    description: "",
  },
  {
    id: 5,
    title: "Parasite",
    poster: "/parasite.jpg",
    releaseDate: 2019,
    rating: 8.5,
    genres: [],
    duration: 0,
    description: "",
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    poster: "/shawshank.jpg",
    releaseDate: 1994,
    rating: 9.3,
    genres: [],
    duration: 0,
    description: "",
  },
];
