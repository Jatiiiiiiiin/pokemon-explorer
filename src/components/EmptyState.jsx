import "./EmptyState.css"

function EmptyState({ searchTerm, selectedType }) {
  return (
    <div className="empty-state">
      <h3 className="empty-state-title">No Pokémon Found</h3>
      <p className="empty-state-message">
        {searchTerm && selectedType !== "all"
          ? `No Pokémon match "${searchTerm}" with type "${selectedType}"`
          : searchTerm
            ? `No Pokémon match "${searchTerm}"`
            : selectedType !== "all"
              ? `No Pokémon found with type "${selectedType}"`
              : "No Pokémon available"}
      </p>
      <p className="empty-state-hint">Try adjusting your search or filter criteria</p>
    </div>
  )
}

export default EmptyState
