import { Link } from "react-router-dom";
import "../styles/Home.css";


function Home() {
  return (
    <section className="home">
      <div className="home-overlay" />

      <div className="home-content">
        <h1 className="home-title">CineScope</h1>
        <p className="home-subtitle">
          Explorez les films, gérez vos favoris et retrouvez vos consultations.
        </p>

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
