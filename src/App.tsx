import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import MoviePage from "./components/MoviePage";
import Bibliotheque from "./components/Bibliotheque";
import Home from "./components/Home";
import SearchBar from "./components/SearchBar";
import NotFound from "./components/NotFound";
import Films from "./components/Films";
import Favoris from "./components/Favorites";
import Profile from "./components/Profile";
import Login from "./components/Login";

import "./styles/App.css";




function App() {
  const [library, setLibrary] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);


  const [toWatch, setToWatch] = useState<number[]>([]);
  const [inProgress, setInProgress] = useState<number[]>([]);
  const [watched, setWatched] = useState<number[]>([]);

  return (
    <BrowserRouter>
      <main>
        <Navbar />

        <Routes>
          <Route 
              path="/" 
              element={<Home />} 
          />


          <Route
            path="/favoris"
            element={
              <Favoris
                favorites={favorites}
                setFavorites={setFavorites}
              />
            }
          />

          <Route
            path="/film"
            element={
              <>
                <SearchBar
                  favorites={favorites}
                  setFavorites={setFavorites}
                  library={library}
                  setLibrary={setLibrary}
                />

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
              </>
            }
          />

            <Route
              path="/film/:id"
              element={
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

              }
            />



          <Route
            path="/bibliotheque"
            element={
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
            }
          />

          <Route path="/profil" 
            element={<Profile />} 
          />

          <Route path="/login" 
            element={<Login />} 
          />



          <Route 
            path="*" 
            element={<NotFound />} 
          />


        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
