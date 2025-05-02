"use client"

import { createContext, useState, useEffect, useCallback } from "react"

export const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("pokemonFavorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error)
        localStorage.removeItem("pokemonFavorites")
      }
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("pokemonFavorites", JSON.stringify(favorites))
  }, [favorites])

  // Add or remove a pokemon from favorites
  const toggleFavorite = useCallback((pokemon) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === pokemon.id)

      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== pokemon.id)
      } else {
        return [...prevFavorites, pokemon]
      }
    })
  }, [])

  // Check if a pokemon is in favorites
  const isFavorite = useCallback(
    (pokemonId) => {
      return favorites.some((fav) => fav.id === pokemonId)
    },
    [favorites],
  )

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}
