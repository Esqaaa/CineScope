import type { Actor } from "../utils/types";
import "../styles/ActorCard.css";

// Composant d'affichage pour une carte d'acteur (photo, nom, personnage)
function ActorCard({ name, character, profile }: Actor) {
  return (
    <div className="actor-card">
      <img src={profile} alt={name} className="actor-photo" />
      <p className="actor-name">{name}</p>
      <p className="actor-role">{character}</p>
    </div>
  );
}

export default ActorCard;
