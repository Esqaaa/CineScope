import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";

// Barre de navigation
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // État de connexion
  const [logged, setLogged] = useState(
    localStorage.getItem("logged") === "true"
  );

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const updateLogin = () => {
      setLogged(localStorage.getItem("logged") === "true");
    };

    window.addEventListener("storage", updateLogin);
    return () => window.removeEventListener("storage", updateLogin);
  }, []);

  // Déconnecte + redirige vers connexion
  function handleLogout() {
    localStorage.removeItem("logged");
    window.dispatchEvent(new Event("storage"));
    setIsOpen(false);
    window.location.href = "/login";
  }

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <h1>CineScope</h1>
        </Link>

        {/* Bouton Hamburger visible sur mobile */}
        <button
          className={`burger-button ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>

        {/* Liens de navigation principaux */}
        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            <button>Accueil</button>
          </Link>

          <Link to="/film" onClick={closeMenu}>
            <button>Films</button>
          </Link>

          <Link to="/favoris" onClick={closeMenu}>
            <button>Favoris</button>
          </Link>

          <Link to="/bibliotheque" onClick={closeMenu}>
            <button>Bibliothèque</button>
          </Link>

          <Link to="/profil" onClick={closeMenu}>
            <button>Profil</button>
          </Link>

          {/* Zone d'authentification */}
          <div className="login-right">
            {logged && (
              <p className="connected-as">
                Connecté en tant que : {user.pseudo}
              </p>
            )}

            {!logged ? (
              <Link to="/login">
                <button className="login-btn">Connexion</button>
              </Link>
            ) : (
              <button className="logout-btn" onClick={handleLogout}>
                Déconnexion
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;