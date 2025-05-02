"use client"

import { useState, useEffect } from "react"
import { useNavigation } from "../contexts/NavigationContext"
import { usePokemon } from "../hooks/usePokemon"
import PokemonDetail from "../components/PokemonDetail"
import LoadingState from "../components/LoadingState"
import ErrorBoundary from "../components/ErrorBoundary"
import "./DetailPage.css"

function DetailPage() {
  const { params } = useNavigation()
  const { fetchPokemonDetail } = usePokemon()
  const [pokemon, setPokemon] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPokemonDetail = async () => {
      if (!params.id) return

      try {
        setIsLoading(true)
        setError(null)
        const data = await fetchPokemonDetail(params.id)
        setPokemon(data)
      } catch (err) {
        setError("Failed to load Pokémon details. Please try again later.")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadPokemonDetail()
  }, [params.id, fetchPokemonDetail])

  return (
    <div className="detail-page">
      <ErrorBoundary>
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : pokemon ? (
          <PokemonDetail pokemon={pokemon} />
        ) : (
          <div className="not-found">Pokémon not found</div>
        )}
      </ErrorBoundary>
    </div>
  )
}

export default DetailPage
