"use client"

import { useState } from "react"
import { usePokemon } from "../hooks/usePokemon"
import { typeColors } from "../utils/constants"
import "./MultiTypeFilter.css"

function MultiTypeFilter() {
  const { allTypes, selectedTypes, setSelectedTypes } = usePokemon()
  const [isOpen, setIsOpen] = useState(false)

  const toggleType = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type)
      } else {
        return [...prev, type]
      }
    })
  }

  return (
    <div className="multi-type-filter">
      <div className="filter-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="filter-title">Filter by Type</span>
        <span className="filter-arrow">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="type-options">
          {allTypes.map((type) => (
            <label key={type} className="type-option">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                className="type-checkbox"
              />
              <span className="type-label" style={{ backgroundColor: typeColors[type.toLowerCase()] || "#A8A878" }}>
                {type}
              </span>
            </label>
          ))}

          {selectedTypes.length > 0 && (
            <button
              className="clear-filters"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedTypes([])
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {selectedTypes.length > 0 && (
        <div className="selected-types">
          {selectedTypes.map((type) => (
            <span
              key={type}
              className="selected-type"
              style={{ backgroundColor: typeColors[type.toLowerCase()] || "#A8A878" }}
            >
              {type}
              <button className="remove-type" onClick={() => toggleType(type)} aria-label={`Remove ${type} filter`}>
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiTypeFilter
