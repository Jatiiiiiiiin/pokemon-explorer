"use client"

import { useNavigation } from "../contexts/NavigationContext"
import { usePokemon } from "../hooks/usePokemon"
import { useFavorites } from "../hooks/useFavorites"
import SearchBar from "../components/SearchBar"
import MultiTypeFilter from "../components/MultiTypeFilter"
import SortOptions from "../components/SortOptions"
import Pagination from "../components/Pagination"
import RandomPokemonButton from "../components/RandomPokemonButton"
import ErrorBoundary from "../components/ErrorBoundary"
import LoadingState from "../components/LoadingState"
import EmptyState from "../components/EmptyState"
import "./HomePage.css"

function HomePage() {
  const { navigate } = useNavigation()
  const { paginatedPokemon, isLoading, error, searchTerm, selectedTypes } = usePokemon()
  const { isFavorite, toggleFavorite } = useFavorites()

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
    <div className="home-page">
      <div className="filters-section">
        <div className="search-container">
          <SearchBar />
        </div>

        <div className="filter-options">
          <MultiTypeFilter />
          <div className="filter-actions">
            <SortOptions />
            <RandomPokemonButton />
          </div>
        </div>
      </div>

      <ErrorBoundary>
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : paginatedPokemon.length === 0 ? (
          <EmptyState searchTerm={searchTerm} selectedType={selectedTypes.length > 0 ? selectedTypes.join(", ") : ""} />
        ) : (
          <>
            <div className="pokemon-grid">
              {paginatedPokemon.map((pokemon) => (
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
                    className={`favorite-toggle ${isFavorite(pokemon.id) ? "active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(pokemon)
                    }}
                    aria-label={isFavorite(pokemon.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        fill={isFavorite(pokemon.id) ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <Pagination />
          </>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default HomePage
