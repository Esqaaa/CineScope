import { useState } from "react";
import "../styles/Rating.css"; // 👈 Import du CSS

interface RatingProps {
  movieId: number;
}

// Composant de notation par étoiles (1 à 5)
export function Rating({ movieId }: RatingProps) {
  // Clé de sauvegarde propre à chaque film dans le localStorage
  const storageKey = `cinescope_rating_${movieId}`;

  // Récupère la note enregistrée ou 0 par défaut
  const [rating, setRating] = useState<number>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? Number(saved) : 0;
  });

  // Enregistre la nouvelle note
  function handleRate(value: number) {
    setRating(value);
    localStorage.setItem(storageKey, value.toString());
  }

  return (
    <div className="rating-container">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleRate(star)}
          className={`star ${star <= rating ? "filled" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}