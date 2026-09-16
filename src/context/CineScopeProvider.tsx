import { FavoritesProvider } from "./FavoritesContext";
import { LibraryProvider } from "./LibraryContext";

export function CineScopeProvider({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <LibraryProvider>
        {children}
      </LibraryProvider>
    </FavoritesProvider>
  );
}
