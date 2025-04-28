"use client"

import { useState, useEffect, useMemo } from "react"
import PokemonCard from "./components/PokemonCard"
import SearchBar from "./components/SearchBar"
import TypeFilter from "./components/TypeFilter"
import LoadingState from "./components/LoadingState"
import EmptyState from "./components/EmptyState"
import ErrorState from "./components/ErrorState"
import { fetchPokemonData } from "./lib/api"
import "./App.css"

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setIsLoading(true)
        const data = await fetchPokemonData()
        setPokemonList(data)
        setFilteredPokemon(data)
      } catch (err) {
        setError("Failed to load Pokémon data. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPokemon()
  }, [])

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType =
        selectedType === "all" ||
        pokemon.types?.some((type) => type.toLowerCase() === selectedType.toLowerCase())
      return matchesSearch && matchesType
    })

    setFilteredPokemon(filtered)
  }, [searchTerm, selectedType, pokemonList])

  const allTypes = useMemo(() => {
    return Array.from(new Set(pokemonList.flatMap((pokemon) => pokemon.types))).sort()
  }, [pokemonList])

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />

  return (
    <div className="app fade-in">
      <header className="header">
        <div className="container">
          <h1>Pokémon Explorer</h1>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="filters">
            <div className="search-container">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className="type-filter-container">
              <TypeFilter types={allTypes} selectedType={selectedType} setSelectedType={setSelectedType} />
            </div>
          </div>

          {filteredPokemon.length === 0 ? (
            <EmptyState searchTerm={searchTerm} selectedType={selectedType} />
          ) : (
            <div className="pokemon-grid">
              {filteredPokemon.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
