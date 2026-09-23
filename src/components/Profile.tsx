import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

// Typage des props
interface ProfileProps {
  setIsAuthenticated?: (auth: boolean) => void;
}

// Typages messages erreurs
interface FormErrors {
  firstName?: string;
  lastName?: string;
  pseudo?: string;
  email?: string;
  password?: string;
}

// Page de gestion profil
function Profile({ setIsAuthenticated }: ProfileProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  // Etat pour validation
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Pré-remplit si données existent déjà
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

  // Fonction validation des champs + format
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Si les champs obligatoires sont vides, message d'erreur
    if (!firstName.trim()) newErrors.firstName = "Le prénom est obligatoire.";
    if (!lastName.trim()) newErrors.lastName = "Le nom est obligatoire.";
    if (!pseudo.trim()) newErrors.pseudo = "Le pseudonyme est obligatoire.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // On vérifie si l'email est vide ou ne correspond pas au format attendu
    if (!email.trim()) {
      newErrors.email = "L'adresse e-mail est obligatoire.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Veuillez saisir une adresse e-mail valide.";
    }

    // Si le mot de passe est vide, on ajoute un message d'erreur
    if (!password.trim()) {
      newErrors.password = "Le mot de passe est obligatoire.";
    }

    // Mise a jour des erreurs
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMessage("");

    if (!validate()) {
      return;
    }

    const userData = {
      firstName,
      lastName,
      pseudo,
      email,
      password,
      bio,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("logged", "true");

    if (setIsAuthenticated) {
      setIsAuthenticated(true);
    }

    setSuccessMessage("Profil enregistré avec succès.");

    setTimeout(() => {
      navigate("/film");
    }, 1200);
  }

  return (
    <section className="profile-page">
      <h2>Mon profil / Inscription</h2>

      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        {/* Message de confirmation */}
        {successMessage && (
          <div className="profile-success">{successMessage}</div>
        )}

        {/* Champs formulaire + gestion erreurs */}
        <div>
          <label>Prénom *</label>
          <input
            type="text"
            placeholder="Votre prénom"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
            }}
          />
          {errors.firstName && <span className="profile-error">{errors.firstName}</span>}
        </div>

        <div>
          <label>Nom *</label>
          <input
            type="text"
            placeholder="Votre nom"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }));
            }}
          />
          {errors.lastName && <span className="profile-error">{errors.lastName}</span>}
        </div>

        <div>
          <label>Pseudonyme *</label>
          <input
            type="text"
            placeholder="Votre pseudonyme"
            value={pseudo}
            onChange={(e) => {
              setPseudo(e.target.value);
              if (errors.pseudo) setErrors((prev) => ({ ...prev, pseudo: undefined }));
            }}
          />
          {errors.pseudo && <span className="profile-error">{errors.pseudo}</span>}
        </div>

        <div>
          <label>Email *</label>
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
          />
          {errors.email && <span className="profile-error">{errors.email}</span>}
        </div>

        <div>
          <label>Mot de passe *</label>
          <input
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />
          {errors.password && <span className="profile-error">{errors.password}</span>}
        </div>

        <div>
          <label>Biographie</label>
          <textarea
            placeholder="Parlez-nous un peu de vous..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button type="submit" className="profile-button">
          Enregistrer et se connecter
        </button>
      </form>
    </section>
  );
}

export default Profile;