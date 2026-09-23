import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

// Page d'accueil 
function Home() {
  useEffect(() => {
    // Bloque le scroll du navigateur
    document.body.style.overflow = "hidden";

    // Réactive le scroll dès qu'on quitte la page d'accueil
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <section className="home">
      <div className="home-overlay" />

      <div className="home-content">
        <h1 className="home-title">CineScope</h1>
        <p className="home-subtitle">
          Explorez les films, gérez vos favoris et retrouvez vos consultations.
        </p>

        {/* Liens de navigation principale */}
        <div className="home-buttons">
          <Link to="/film">
            <button className="btn-primary">Voir les films</button>
          </Link>

          <Link to="/favoris">
            <button className="btn-secondary">Mes favoris</button>
          </Link>

          <Link to="/bibliotheque">
            <button className="btn-secondary">Ma bibliothèque</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;