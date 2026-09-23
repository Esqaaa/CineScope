import "../styles/Bibliotheque.css";
import { useLibraryMovies } from "../hooks/useLibraryMovies";
import { LibraryCategory } from "../components/LibraryCategory";

// Page principale de la bibliothèque
function Bibliotheque() {
  // Récupération des films classés par statut via le hook
  const { getMoviesByStatus, loading } = useLibraryMovies();

  // Indicateur de chargement
  if (loading) {
    return (
      <section className="library-page">
        <h2>Ma bibliothèque</h2>
        <p className="loading-text">Chargement de votre bibliothèque...</p>
      </section>
    );
  }

  // Organisation en 3 colonnes de catégories
  return (
    <section className="library-page">
      <h2>Ma bibliothèque</h2>

      <div className="library-columns">
        <div className="library-block">
          <LibraryCategory
            title="À regarder"
            movies={getMoviesByStatus("towatch")}
          />
        </div>

        <div className="library-block">
          <LibraryCategory
            title="En cours"
            movies={getMoviesByStatus("inprogress")}
          />
        </div>

        <div className="library-block">
          <LibraryCategory
            title="Vu"
            movies={getMoviesByStatus("watched")}
          />
        </div>
      </div>
    </section>
  );
}

export default Bibliotheque;