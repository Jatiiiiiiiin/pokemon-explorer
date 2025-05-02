"use client"

import { useNavigation } from "../contexts/NavigationContext"
import { typeColors } from "../utils/constants"
import "./ComparisonCard.css"

function ComparisonCard({ pokemon, onRemove }) {
  const { navigate } = useNavigation()

  if (!pokemon) {
    return (
      <div className="comparison-card empty">
        <div className="empty-message">Select a Pokémon to compare</div>
      </div>
    )
  }

  return (
    <div className="comparison-card">
      <div className="comparison-header">
        <h3 className="comparison-name">{pokemon.name}</h3>
        <span className="comparison-id">#{pokemon.id.toString().padStart(3, "0")}</span>
        {onRemove && (
          <button className="remove-button" onClick={onRemove} aria-label="Remove from comparison">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      <div className="comparison-image">
        <img src={pokemon.sprite || "/placeholder.svg"} alt={pokemon.name} />
      </div>

      <div className="comparison-types">
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

      <div className="comparison-stats">
        {pokemon.stats.map((stat) => (
          <div key={stat.name} className="comparison-stat">
            <div className="stat-label">{formatStatName(stat.name)}</div>
            <div className="stat-bar-container">
              <div
                className="stat-bar"
                style={{
                  width: `${Math.min(100, (stat.value / 150) * 100)}%`,
                  backgroundColor: getStatColor(stat.name),
                }}
              ></div>
            </div>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <button className="view-details-link" onClick={() => navigate("detail", { id: pokemon.id })}>
        View Details
      </button>
    </div>
  )
}

function formatStatName(name) {
  const nameMap = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  }
  return nameMap[name] || name
}

function getStatColor(name) {
  const colorMap = {
    hp: "#FF5959",
    attack: "#F5AC78",
    defense: "#FAE078",
    "special-attack": "#9DB7F5",
    "special-defense": "#A7DB8D",
    speed: "#FA92B2",
  }
  return colorMap[name] || "#A8A878"
}

export default ComparisonCard
