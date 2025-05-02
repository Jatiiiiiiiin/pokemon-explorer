"use client"

import { createContext, useState, useEffect, useCallback, useMemo } from "react"
import { fetchAllPokemon, fetchPokemonDetails, fetchEvolutionChain } from "../services/api"

export const PokemonContext = createContext()

export function PokemonProvider({ children }) {
  const [allPokemon, setAllPokemon] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filters and sorting
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTypes, setSelectedTypes] = useState([])
  const [sortOption, setSortOption] = useState("id-asc")

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  // Fetch all pokemon data
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setIsLoading(true)
        const data = await fetchAllPokemon(151) // Fetch first 151 Pokemon
        setAllPokemon(data)
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

  // Filter and sort pokemon
  useEffect(() => {
    if (!allPokemon.length) return

    let result = [...allPokemon]

    // Apply search filter
    if (searchTerm) {
      result = result.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Apply type filters
    if (selectedTypes.length > 0) {
      result = result.filter((pokemon) =>
        selectedTypes.every((type) =>
          pokemon.types.some((pokemonType) => pokemonType.toLowerCase() === type.toLowerCase()),
        ),
      )
    }

    // Apply sorting
    result = sortPokemon(result, sortOption)

    setFilteredPokemon(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchTerm, selectedTypes, sortOption, allPokemon])

  // Sort pokemon based on selected option
  const sortPokemon = useCallback((pokemonList, option) => {
    const [field, direction] = option.split("-")
    const multiplier = direction === "asc" ? 1 : -1

    return [...pokemonList].sort((a, b) => {
      if (field === "id") {
        return (a.id - b.id) * multiplier
      } else if (field === "name") {
        return a.name.localeCompare(b.name) * multiplier
      }
      return 0
    })
  }, [])

  // Get paginated pokemon
  const paginatedPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredPokemon.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredPokemon, currentPage, itemsPerPage])

  // Get total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredPokemon.length / itemsPerPage)
  }, [filteredPokemon, itemsPerPage])

  // Get all unique types
  const allTypes = useMemo(() => {
    if (!allPokemon.length) return []
    return Array.from(new Set(allPokemon.flatMap((pokemon) => pokemon.types))).sort()
  }, [allPokemon])

  // Get random pokemon
  const getRandomPokemon = useCallback(() => {
    if (!allPokemon.length) return null
    const randomIndex = Math.floor(Math.random() * allPokemon.length)
    return allPokemon[randomIndex]
  }, [allPokemon])

  // Fetch detailed pokemon data
  const fetchPokemonDetail = useCallback(async (idOrName) => {
    try {
      const pokemonDetail = await fetchPokemonDetails(idOrName)

      // Fetch evolution chain
      if (pokemonDetail.species && pokemonDetail.species.url) {
        const evolutionData = await fetchEvolutionChain(pokemonDetail.species.url)
        return { ...pokemonDetail, evolution: evolutionData }
      }

      return pokemonDetail
    } catch (err) {
      console.error("Error fetching pokemon details:", err)
      throw err
    }
  }, [])

  const value = {
    allPokemon,
    filteredPokemon,
    paginatedPokemon,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedTypes,
    setSelectedTypes,
    sortOption,
    setSortOption,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    allTypes,
    getRandomPokemon,
    fetchPokemonDetail,
  }

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
}
