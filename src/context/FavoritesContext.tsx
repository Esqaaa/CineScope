import { createContext, useContext, useReducer } from "react";

// Etat favoris -> IDs de films
type FavoritesState = number[];

// Actions possibles pour reducer favoris
type FavoritesAction =
  | { type: "ADD"; id: number }
  | { type: "REMOVE"; id: number };

// Reducer gérant les favoris
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

// Création context + typage
const FavoritesContext = createContext<{
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
} | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  // Ajoute un film aux favoris
  function addFavorite(id: number) {
    dispatch({ type: "ADD", id });
  }

  // Retire un film des favoris
  function removeFavorite(id: number) {
    dispatch({ type: "REMOVE", id });
  }

  // Film présent dans favoris ?
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

// Hook + vérification du Provider
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
