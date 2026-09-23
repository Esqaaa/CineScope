import { FavoritesProvider } from "./FavoritesContext";
import { LibraryProvider } from "./LibraryContext";

// Composant pour regrouper tous les Context Providers
export function CineScopeProvider({ children }: { children: React.ReactNode }) {
  return (
    // Fournit l'état global des films favoris à toute l'application
    <FavoritesProvider>
      {/* Fournit l'état global de la bibliothèque personnelle à toute l'application */}
      <LibraryProvider>
        {children}
      </LibraryProvider>
    </FavoritesProvider>
  );
}
