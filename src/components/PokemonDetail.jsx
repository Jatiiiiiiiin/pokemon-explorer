"use client"

import { useState } from "react"
import { useNavigation } from "../contexts/NavigationContext"
import { useFavorites } from "../hooks/useFavorites"
import { typeColors } from "../utils/constants"
import "./PokemonDetail.css"

function PokemonDetail({ pokemon }) {
  const { navigate } = useNavigation()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [activeTab, setActiveTab] = useState("stats")
  const favorite = isFavorite(pokemon.id)

  if (!pokemon) return null

  const renderStats = () => (
    <div className="stats-container">
      {pokemon.stats.map((stat) => (
        <div key={stat.name} className="stat-row">
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
  )

  const renderAbilities = () => (
    <div className="abilities-container">
      <h3 className="section-subtitle">Abilities</h3>
      <ul className="abilities-list">
        {pokemon.abilities.map((ability, index) => (
          <li key={index} className="ability-item">
            <span className="ability-name">{formatName(ability.name)}</span>
            {ability.isHidden && <span className="hidden-ability">(Hidden)</span>}
          </li>
        ))}
      </ul>
    </div>
  )

  const renderMoves = () => (
    <div className="moves-container">
      <h3 className="section-subtitle">Moves</h3>
      <div className="moves-list">
        {pokemon.moves.map((move, index) => (
          <span key={index} className="move-item">
            {formatName(move)}
          </span>
        ))}
      </div>
    </div>
  )

  const renderEvolution = () => {
    if (!pokemon.evolution) {
      return <p>Evolution data not available</p>
    }

    const renderEvolutionChain = (chain, level = 0) => {
      return (
        <div key={chain.species} className="evolution-item" style={{ marginLeft: `${level * 2}rem` }}>
          <div className="evolution-name">{formatName(chain.species)}</div>
          {chain.evolves_to.map((evolution) => renderEvolutionChain(evolution, level + 1))}
        </div>
      )
    }

    return (
      <div className="evolution-container">
        <h3 className="section-subtitle">Evolution Chain</h3>
        {renderEvolutionChain(pokemon.evolution)}
      </div>
    )
  }

  const formatStatName = (name) => {
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

  const getStatColor = (name) => {
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

  const formatName = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="pokemon-detail">
      <div className="detail-header">
        <div className="detail-title">
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <span className="pokemon-id">#{pokemon.id.toString().padStart(3, "0")}</span>
        </div>
        <button
          className={`favorite-button ${favorite ? "active" : ""}`}
          onClick={() => toggleFavorite(pokemon)}
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
          <span>{favorite ? "Favorited" : "Add to Favorites"}</span>
        </button>
      </div>

      <div className="detail-content">
        <div className="detail-main">
          <div className="sprites-container">
            <div className="sprite-row">
              <div className="sprite-box">
                <img src={pokemon.sprites.front || "/placeholder.svg"} alt={`${pokemon.name} front view`} />
                <span>Front</span>
              </div>
              <div className="sprite-box">
                <img src={pokemon.sprites.back || "/placeholder.svg"} alt={`${pokemon.name} back view`} />
                <span>Back</span>
              </div>
            </div>
            <div className="sprite-row">
              <div className="sprite-box">
                <img src={pokemon.sprites.frontShiny || "/placeholder.svg"} alt={`${pokemon.name} shiny front view`} />
                <span>Shiny Front</span>
              </div>
              <div className="sprite-box">
                <img src={pokemon.sprites.backShiny || "/placeholder.svg"} alt={`${pokemon.name} shiny back view`} />
                <span>Shiny Back</span>
              </div>
            </div>
          </div>

          <div className="detail-info">
            <div className="pokemon-types detail-types">
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

            <div className="physical-stats">
              <div className="physical-stat">
                <span className="physical-stat-label">Height</span>
                <span className="physical-stat-value">{pokemon.height} m</span>
              </div>
              <div className="physical-stat">
                <span className="physical-stat-label">Weight</span>
                <span className="physical-stat-value">{pokemon.weight} kg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-tabs">
          <button
            className={`tab-button ${activeTab === "stats" ? "active" : ""}`}
            onClick={() => setActiveTab("stats")}
          >
            Stats
          </button>
          <button
            className={`tab-button ${activeTab === "abilities" ? "active" : ""}`}
            onClick={() => setActiveTab("abilities")}
          >
            Abilities
          </button>
          <button
            className={`tab-button ${activeTab === "moves" ? "active" : ""}`}
            onClick={() => setActiveTab("moves")}
          >
            Moves
          </button>
          <button
            className={`tab-button ${activeTab === "evolution" ? "active" : ""}`}
            onClick={() => setActiveTab("evolution")}
          >
            Evolution
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "stats" && renderStats()}
          {activeTab === "abilities" && renderAbilities()}
          {activeTab === "moves" && renderMoves()}
          {activeTab === "evolution" && renderEvolution()}
        </div>
      </div>

      <div className="detail-actions">
        <button className="button button-outline" onClick={() => navigate("home")}>
          Back to List
        </button>
        <button className="button" onClick={() => navigate("compare", {}, { pokemonId: pokemon.id })}>
          Compare
        </button>
      </div>
    </div>
  )
}

export default PokemonDetail
