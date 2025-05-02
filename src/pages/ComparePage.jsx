"use client"

import { useState, useEffect } from "react"
import { useNavigation } from "../contexts/NavigationContext"
import { usePokemon } from "../hooks/usePokemon"
import ComparisonCard from "../components/ComparisonCard"
import "./ComparePage.css"

function ComparePage() {
  const { state } = useNavigation()
  const { allPokemon, fetchPokemonDetail } = usePokemon()

  const [selectedPokemon1, setSelectedPokemon1] = useState(null)
  const [selectedPokemon2, setSelectedPokemon2] = useState(null)
  const [pokemon1, setPokemon1] = useState(null)
  const [pokemon2, setPokemon2] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // If a pokemon was passed via state, use it for the first slot
  useEffect(() => {
    if (state?.pokemonId && allPokemon.length > 0) {
      const id = Number.parseInt(state.pokemonId)
      setSelectedPokemon1(id.toString())
    }
  }, [state, allPokemon])

  // Load pokemon details when selections change
  useEffect(() => {
    const loadPokemonDetails = async () => {
      setIsLoading(true)

      try {
        if (selectedPokemon1) {
          const data1 = await fetchPokemonDetail(selectedPokemon1)
          setPokemon1(data1)
        } else {
          setPokemon1(null)
        }

        if (selectedPokemon2) {
          const data2 = await fetchPokemonDetail(selectedPokemon2)
          setPokemon2(data2)
        } else {
          setPokemon2(null)
        }
      } catch (error) {
        console.error("Error loading pokemon details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPokemonDetails()
  }, [selectedPokemon1, selectedPokemon2, fetchPokemonDetail])

  return (
    <div className="compare-page">
      <div className="compare-header">
        <h2 className="compare-title">Compare Pokémon</h2>
        <p className="compare-description">Select two Pokémon to compare their stats side by side</p>
      </div>

      <div className="pokemon-selectors">
        <div className="selector-container">
          <label htmlFor="pokemon1" className="selector-label">
            First Pokémon
          </label>
          <select
            id="pokemon1"
            value={selectedPokemon1 || ""}
            onChange={(e) => setSelectedPokemon1(e.target.value || null)}
            className="pokemon-select"
          >
            <option value="">Select a Pokémon</option>
            {allPokemon.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id}>
                #{pokemon.id.toString().padStart(3, "0")} {pokemon.name}
              </option>
            ))}
          </select>
        </div>

        <div className="selector-container">
          <label htmlFor="pokemon2" className="selector-label">
            Second Pokémon
          </label>
          <select
            id="pokemon2"
            value={selectedPokemon2 || ""}
            onChange={(e) => setSelectedPokemon2(e.target.value || null)}
            className="pokemon-select"
          >
            <option value="">Select a Pokémon</option>
            {allPokemon.map((pokemon) => (
              <option key={pokemon.id} value={pokemon.id}>
                #{pokemon.id.toString().padStart(3, "0")} {pokemon.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="comparison-container">
        <div className="comparison-card-wrapper">
          <ComparisonCard pokemon={pokemon1} onRemove={() => setSelectedPokemon1(null)} />
        </div>
        <div className="comparison-card-wrapper">
          <ComparisonCard pokemon={pokemon2} onRemove={() => setSelectedPokemon2(null)} />
        </div>
      </div>
    </div>
  )
}

export default ComparePage
