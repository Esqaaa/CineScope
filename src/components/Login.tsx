import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const saved = localStorage.getItem("user");

    if (!saved) {
      setError("Aucun compte n'existe. Veuillez en créer un dans Profil.");
      return;
    }

    const user = JSON.parse(saved);

    if (email === user.email && password === user.password) {
      localStorage.setItem("logged", "true");
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
    </section>
  );
}

export default Login;
