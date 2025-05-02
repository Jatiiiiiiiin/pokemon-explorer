"use client"

import { useNavigation } from "../contexts/NavigationContext"
import { useFavorites } from "../hooks/useFavorites"
import ErrorBoundary from "../components/ErrorBoundary"
import "./FavoritesPage.css"

function FavoritesPage() {
  const { navigate } = useNavigation()
  const { favorites, toggleFavorite } = useFavorites()

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

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h2 className="favorites-title">Your Favorite Pokémon</h2>
        <p className="favorites-count">
          {favorites.length} {favorites.length === 1 ? "Pokémon" : "Pokémon"} saved
        </p>
      </div>

      <ErrorBoundary>
        {favorites.length === 0 ? (
          <div className="no-favorites">
            <p>You haven't added any Pokémon to your favorites yet.</p>
            <button className="button" onClick={() => navigate("home")}>
              Browse Pokémon
            </button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((pokemon) => (
              <div key={pokemon.id} className="pokemon-card-wrapper">
                <div className="pokemon-link" onClick={() => navigate("detail", { id: pokemon.id })}>
                  <div className="pokemon-card">
                    <div className="pokemon-card-header">
                      <h2 className="pokemon-name">{pokemon.name}</h2>
                      <span className="pokemon-id">#{pokemon.id.toString().padStart(3, "0")}</span>
                    </div>
                    <div className="pokemon-card-content">
                      <div className="pokemon-image-container">
                        <img
                          src={pokemon.sprite || "https://via.placeholder.com/150"}
                          alt={pokemon.name}
                          className="pokemon-image"
                        />
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
                </div>
                <button
                  className="remove-favorite"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(pokemon)
                  }}
                  aria-label="Remove from favorites"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default FavoritesPage
