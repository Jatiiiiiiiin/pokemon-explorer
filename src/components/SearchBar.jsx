"use client"

import { useState, useEffect } from "react"
import { usePokemon } from "../hooks/usePokemon"
import "./SearchBar.css"

function SearchBar() {
  const { searchTerm, setSearchTerm } = usePokemon()
  const [inputValue, setInputValue] = useState(searchTerm)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [inputValue, setSearchTerm])

  return (
    <div className="search-bar">
      <div className="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search Pokémon by name..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="search-input"
        aria-label="Search Pokémon"
      />
      {inputValue && (
        <button className="search-clear" onClick={() => setInputValue("")} aria-label="Clear search">
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
  )
}

export default SearchBar
