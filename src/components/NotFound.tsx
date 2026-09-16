import { Link } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <section className="notfound">
      <h1 className="nf-title">Page introuvable</h1>

      <p className="nf-message">La page que vous recherchez n'existe pas.</p>

      <Link to="/">
        <button className="nf-button">Retour à l'accueil</button>
      </Link>
    </section>
  );
}

export default NotFound;
