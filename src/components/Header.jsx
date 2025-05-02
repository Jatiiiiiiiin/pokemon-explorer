"use client"

import { useNavigation } from "../contexts/NavigationContext"
import { useFavorites } from "../hooks/useFavorites"
import "./Header.css"

function Header() {
  const { currentPage, navigate } = useNavigation()
  const { favorites } = useFavorites()

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo" onClick={() => navigate("home")}>
            <h1>Pokémon Explorer</h1>
          </div>

          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <button
                  className={`nav-link ${currentPage === "home" ? "active" : ""}`}
                  onClick={() => navigate("home")}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${currentPage === "favorites" ? "active" : ""}`}
                  onClick={() => navigate("favorites")}
                >
                  Favorites
                  {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${currentPage === "compare" ? "active" : ""}`}
                  onClick={() => navigate("compare")}
                >
                  Compare
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
