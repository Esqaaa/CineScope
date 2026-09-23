import { useState, type JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import MoviePage from "./components/MoviePage";
import Bibliotheque from "./components/Bibliotheque";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Films from "./components/Films";
import Favoris from "./components/Favorites";
import Profile from "./components/Profile";
import Login from "./components/Login";

import "./styles/App.css";

// Composant pour protéger les routes réservées aux utilisateurs connectés
function ProtectedRoute({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: JSX.Element;
}) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  // Lit directement le localStorage au démarrage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("logged") === "true"
  );

  const [library, setLibrary] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toWatch, setToWatch] = useState<number[]>([]);
  const [inProgress, setInProgress] = useState<number[]>([]);
  const [watched, setWatched] = useState<number[]>([]);

  return (
    <BrowserRouter>
      <main>
        {/* On masque la Navbar si l'utilisateur n'est pas connecté */}
        {isAuthenticated && <Navbar />}

        <Routes>
          {/* Page de connexion (Accessible hors connexion) */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />

          {/* Page Profil / Inscription (Accessible à tous pour la création de compte) */}
          <Route
            path="/profil"
            element={<Profile setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Routes protégées (Redirigent vers /login si pas connecté) */}
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favoris"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Favoris favorites={favorites} setFavorites={setFavorites} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/film"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Films
                  favorites={favorites}
                  setFavorites={setFavorites}
                  library={library}
                  setLibrary={setLibrary}
                  toWatch={toWatch}
                  inProgress={inProgress}
                  watched={watched}
                  setToWatch={setToWatch}
                  setInProgress={setInProgress}
                  setWatched={setWatched}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/film/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MoviePage
                  favorites={favorites}
                  setFavorites={setFavorites}
                  library={library}
                  setLibrary={setLibrary}
                  toWatch={toWatch}
                  setToWatch={setToWatch}
                  inProgress={inProgress}
                  setInProgress={setInProgress}
                  watched={watched}
                  setWatched={setWatched}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bibliotheque"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Bibliotheque
                  library={library}
                  setLibrary={setLibrary}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  toWatch={toWatch}
                  inProgress={inProgress}
                  watched={watched}
                  setToWatch={setToWatch}
                  setInProgress={setInProgress}
                  setWatched={setWatched}
                />
              </ProtectedRoute>
            }
          />

          {/* Capture des routes non définies (Erreur 404) */}
          <Route path="*" 
            element={
              <NotFound />
            } 
          />
        
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;