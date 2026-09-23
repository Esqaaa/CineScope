import { Link } from "react-router-dom";
import "../styles/NotFound.css";

// Page 404 lorsque route existe pas
function NotFound() {
  return (
    <section className="notfound">
      <h1 className="nf-title">Page introuvable</h1>

      <p className="nf-message">La page que vous recherchez n'existe pas.</p>

      {/* Redirection vers films */}
      <Link to="/film">
        <button className="nf-button">Retour aux films</button>
      </Link>
    </section>
  );
}

export default NotFound;
