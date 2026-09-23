import "../styles/SearchBar.css";

// Typage des props
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

// Barre de recherche 
function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Rechercher un film..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
  );
}

export default SearchBar;