import "./PokemonCard.css"

// Map of Pokemon types to colors
const typeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
}

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <div className="pokemon-card-header">
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <span className="pokemon-id">#{pokemon.id.toString().padStart(3, "0")}</span>
      </div>
      <div className="pokemon-card-content">
        <div className="pokemon-image-container">
          <img src={pokemon.sprite || "https://via.placeholder.com/150"} alt={pokemon.name} className="pokemon-image" />
        </div>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="type-badge"
              style={{ backgroundColor: typeColors[type.toLowerCase()] || "#A8A878" }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonCard
