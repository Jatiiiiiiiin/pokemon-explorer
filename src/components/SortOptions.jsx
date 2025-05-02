"use client"

import { usePokemon } from "../hooks/usePokemon"
import "./SortOptions.css"

function SortOptions() {
  const { sortOption, setSortOption } = usePokemon()

  return (
    <div className="sort-options">
      <label htmlFor="sort-select" className="sort-label">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="sort-select"
      >
        <option value="id-asc">ID (Lowest first)</option>
        <option value="id-desc">ID (Highest first)</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
      </select>
    </div>
  )
}

export default SortOptions
