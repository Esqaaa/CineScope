import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate(); 

  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (saved) {
      const u = JSON.parse(saved);
      setFirstName(u.firstName || "");
      setLastName(u.lastName || "");
      setPseudo(u.pseudo || "");
      setEmail(u.email || "");
      setPassword(u.password || "");
      setBio(u.bio || "");
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      pseudo,
      email,
      password,
      bio,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Profil enregistré !");
    navigate("/"); 
  }

  return (
    <section className="profile-page">
      <h2>Mon profil</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Prénom</label>
        <input
          type="text"
          placeholder="Votre prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Nom</label>
        <input
          type="text"
          placeholder="Votre nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Pseudonyme</label>
        <input
          type="text"
          placeholder="Votre pseudonyme"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="votre@email.com"
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

        <label>Biographie</label>
        <textarea
          placeholder="Parlez-nous un peu de vous..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button type="submit" className="profile-button">
          Enregistrer mon profil
        </button>
      </form>
    </section>
  );
}

export default Profile;
