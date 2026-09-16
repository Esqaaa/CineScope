import { createContext, useContext, useReducer } from "react";

type FavoritesState = number[];

type FavoritesAction =
  | { type: "ADD"; id: number }
  | { type: "REMOVE"; id: number };

function favoritesReducer(state: FavoritesState, action: FavoritesAction) {
  switch (action.type) {
    case "ADD":
      return state.includes(action.id) ? state : [...state, action.id];
    case "REMOVE":
      return state.filter((f) => f !== action.id);
    default:
      return state;
  }
}

const FavoritesContext = createContext<{
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
} | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  function addFavorite(id: number) {
    dispatch({ type: "ADD", id });
  }

  function removeFavorite(id: number) {
    dispatch({ type: "REMOVE", id });
  }

  function isFavorite(id: number) {
    return favorites.includes(id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
