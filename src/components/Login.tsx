import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

interface LoginProps {
  setIsAuthenticated: (auth: boolean) => void;
}

function Login({ setIsAuthenticated }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const saved = localStorage.getItem("user");

    if (!saved) {
      setError("Aucun compte trouvé. Veuillez en créer un ci-dessous.");
      return;
    }

    const user = JSON.parse(saved);

    if (email === user.email && password === user.password) {
      localStorage.setItem("logged", "true");
      setIsAuthenticated(true);
      navigate("/");
    } else {
      setError("Identifiants incorrects.");
    }
  }

  return (
    <section className="login-page">
      <h2>Connexion</h2>

      <form className="login-form" onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Mot de passe</label>
        <input
          type="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-button">
          Se connecter
        </button>
      </form>

      <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
        <p>Pas encore de compte ?</p>
        <button
          type="button"
          onClick={() => navigate("/profil")}
          className="login-button"
          style={{ backgroundColor: "#444", marginTop: "0.5rem" }}
        >
          Créer un compte
        </button>
      </div>
    </section>
  );
}

export default Login;