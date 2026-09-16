import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [logged, setLogged] = useState(
    localStorage.getItem("logged") === "true",
  );

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const updateLogin = () => {
      setLogged(localStorage.getItem("logged") === "true");
    };

    window.addEventListener("storage", updateLogin);
    return () => window.removeEventListener("storage", updateLogin);
  }, []);

  function handleLogout() {
    localStorage.removeItem("logged");
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/login";
  }

  return (
    <nav className="navbar">
      <h1>CineScope</h1>

      <Link to="/">
        <button>Accueil</button>
      </Link>

      <Link to="/favoris">
        <button>Favoris</button>
      </Link>

      <Link to="/film">
        <button>Films</button>
      </Link>

      <Link to="/bibliotheque">
        <button>Bibliothèque</button>
      </Link>

      <Link to="/profil">
        <button>Profil</button>
      </Link>

      {logged && (
        <p className="connected-as">Connecté en tant que : {user.pseudo}</p>
      )}

      {!logged && (
        <Link to="/login" className="login-right">
          <button>Connexion</button>
        </Link>
      )}

      {logged && (
        <button className="logout-btn login-right" onClick={handleLogout}>
          Déconnexion
        </button>
      )}
    </nav>
  );
}

export default Navbar;
