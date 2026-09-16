import { createContext, useContext, useState } from "react";

type Status = "towatch" | "inprogress" | "watched";

interface LibraryState {
  [id: number]: Status;
}

const LibraryContext = createContext<{
  library: LibraryState;
  addToLibrary: (id: number) => void;
  setStatus: (id: number, status: Status) => void;
  removeFromLibrary: (id: number) => void;
} | null>(null);

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [library, setLibrary] = useState<LibraryState>({});

  function addToLibrary(id: number) {
    if (!library[id]) {
      setLibrary({ ...library, [id]: "towatch" });
    }
  }

  function setStatus(id: number, status: Status) {
    setLibrary({ ...library, [id]: status });
  }

  function removeFromLibrary(id: number) {
    const updated = { ...library };
    delete updated[id];
    setLibrary(updated);
  }

  return (
    <LibraryContext.Provider
      value={{ library, addToLibrary, setStatus, removeFromLibrary }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used inside LibraryProvider");
  return ctx;
}
