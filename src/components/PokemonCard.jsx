"use client"

import { useNavigation } from "../contexts/NavigationContext"
import { useFavorites } from "../hooks/useFavorites"
import { typeColors } from "../utils/constants"
import "./PokemonCard.css"

function PokemonCard({ pokemon }) {
  const { navigate } = useNavigation()
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorite = isFavorite(pokemon.id)

  const handleCardClick = (e) => {
    e.preventDefault()
    navigate("detail", { id: pokemon.id })
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    toggleFavorite(pokemon)
  }

  return (
    <div className="pokemon-card" onClick={handleCardClick}>
      <div className="pokemon-card-header">
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <span className="pokemon-id">#{pokemon.id.toString().padStart(3, "0")}</span>
      </div>
      <div className="pokemon-card-content">
        <div className="pokemon-image-container">
          <img src={pokemon.sprite || "https://via.placeholder.com/150"} alt={pokemon.name} className="pokemon-image" />
          <button
            className={`favorite-button ${favorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={favorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
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
        {pokemon.stats && (
          <div className="pokemon-stats">
            {pokemon.stats
              .filter((stat) => ["hp", "attack", "defense"].includes(stat.name))
              .map((stat) => (
                <div key={stat.name} className="stat">
                  <span className="stat-name">{stat.name}</span>
                  <span className="stat-value">{stat.value}</span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonCard
