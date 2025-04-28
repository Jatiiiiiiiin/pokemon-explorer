"use client"

import "./TypeFilter.css"

function TypeFilter({ types, selectedType, setSelectedType }) {
  return (
    <div className="type-filter">
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="type-select">
        <option value="all">All Types</option>
        {types.map((type) => (
          <option key={type} value={type} className="type-option">
            {type}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TypeFilter
