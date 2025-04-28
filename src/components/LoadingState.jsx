import "./LoadingState.css"

function LoadingState() {
  return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading Pokémon data...</p>
    </div>
  )
}

export default LoadingState
