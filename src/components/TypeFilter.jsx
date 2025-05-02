"use client"

import { usePokemon } from "../hooks/usePokemon"
import { typeColors } from "../utils/constants"
import "./TypeFilter.css"

function TypeFilter() {
  const { allTypes, selectedTypes, setSelectedTypes } = usePokemon()

  const handleTypeClick = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type)
      } else {
        return [...prev, type]
      }
    })
  }

  return (
    <div className="type-filter">
      <h3 className="type-filter-title">Filter by type</h3>
      <div className="type-buttons">
        {allTypes.map((type) => (
          <button
            key={type}
            className={`type-button ${selectedTypes.includes(type) ? "active" : ""}`}
            style={{
              backgroundColor: selectedTypes.includes(type) ? typeColors[type.toLowerCase()] : "transparent",
              borderColor: typeColors[type.toLowerCase()],
              color: selectedTypes.includes(type) ? "white" : typeColors[type.toLowerCase()],
            }}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      {selectedTypes.length > 0 && (
        <button className="clear-filters-button" onClick={() => setSelectedTypes([])}>
          Clear filters
        </button>
      )}
    </div>
  )
}

export default TypeFilter
