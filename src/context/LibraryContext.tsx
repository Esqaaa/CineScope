import { createContext, useContext, useState, useEffect } from "react";

// Définition des statuts possibles pour un film dans la bibliothèque
type Status = "towatch" | "inprogress" | "watched";

// Type du dictionnaire associant l'ID d'un film à son statut
interface LibraryState {
  [id: number]: Status;
}

// Clé unique pour la sauvegarde dans le localStorage
const STORAGE_KEY = "cinescope_library";

// Création du contexte pour la gestion de la bibliothèque
const LibraryContext = createContext<{
  library: LibraryState;
  addToLibrary: (id: number) => void;
  setStatus: (id: number, status: Status) => void;
  removeFromLibrary: (id: number) => void;
} | null>(null);

// Provider enveloppant l'application pour partager l'état de la bibliothèque
export function LibraryProvider({ children }: { children: React.ReactNode }) {
  // Initialisation de l'état en lisant le localStorage s'il existe
  const [library, setLibrary] = useState<LibraryState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  // Sauvegarde automatique dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
  }, [library]);

  // Ajoute un film à la bibliothèque avec le statut "towatch" par défaut
  function addToLibrary(id: number) {
    if (!library[id]) {
      setLibrary((prev) => ({ ...prev, [id]: "towatch" }));
    }
  }

  // Met à jour le statut d'un film existant
  function setStatus(id: number, status: Status) {
    setLibrary((prev) => ({ ...prev, [id]: status }));
  }

  // Retire un film de la bibliothèque
  function removeFromLibrary(id: number) {
    setLibrary((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }

  return (
    <LibraryContext.Provider
      value={{ library, addToLibrary, setStatus, removeFromLibrary }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

// Hook personnalisé pour consommer le contexte en toute sécurité
export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used inside LibraryProvider");
  return ctx;
}