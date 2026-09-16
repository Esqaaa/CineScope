import { useState, useEffect } from "react";

interface TMDBResponse {
  id?: number;
  title?: string;
  success?: boolean;
  status_code?: number;
  status_message?: string;
  [key: string]: any;
}

function DebugPage() {
  const [movieId, setMovieId] = useState<string>("157336"); // Interstellar
  const [jsonData, setJsonData] = useState<TMDBResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = (id: string) => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(async (res) => {
        if (res.status === 401) {
          throw new Error("Erreur 401 : Token TMDB v4 invalide ou non chargé.");
        }
        if (res.status === 404) {
          throw new Error(`Erreur 404 : L'ID ${id} n'existe pas ou film upcoming.`);
        }
        if (!res.ok) {
          throw new Error(`Erreur ${res.status} lors de la récupération des données.`);
        }
        return res.json();
      })
      .then((data: TMDBResponse) => {
        setJsonData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setJsonData(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovieDetails(movieId);
  }, []);

  return (
    <div style={{ padding: "20px", color: "#e6e6e6", background: "#0f0f11", minHeight: "100vh" }}>
      <h1>Debug API TMDB v4 — Inspecteur JSON</h1>
      <p>Entrez un ID de film pour voir la réponse complète de TMDB v4.</p>

      <div style={{ marginBottom: "20px", marginTop: "20px" }}>
        <label style={{ marginRight: "10px" }}>ID du film :</label>
        <input
          type="text"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          style={{
            padding: "8px 12px",
            marginRight: "10px",
            background: "#1a1a1c",
            color: "#fff",
            border: "1px solid #3a3a3d",
            borderRadius: "4px"
          }}
        />
        <button
          onClick={() => fetchMovieDetails(movieId)}
          style={{
            padding: "8px 16px",
            background: "#e50914",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Inspecter
        </button>
      </div>

      {loading && <p>Chargement du JSON...</p>}

      {error && (
        <div style={{ padding: "12px", background: "#4a1212", border: "1px solid #ff4d4d", borderRadius: "6px", color: "#ffcccc" }}>
          <strong>{error}</strong>
        </div>
      )}

      {jsonData && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            Résultat JSON : {jsonData.title ?? "Aucun titre"} (ID: {jsonData.id ?? movieId})
          </h2>
          <pre
            style={{
              background: "#161618",
              color: "#50fa7b",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #2a2a2d",
              overflowX: "auto",
              maxHeight: "650px",
              fontSize: "14px"
            }}
          >
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default DebugPage;
