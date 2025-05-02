import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { PokemonProvider } from "./contexts/PokemonContext.jsx"
import { FavoritesProvider } from "./contexts/FavoritesContext.jsx"
import  ErrorBoundary  from "./components/ErrorBoundary.jsx"
import { NavigationProvider } from "./contexts/NavigationContext.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <NavigationProvider>
        <PokemonProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </PokemonProvider>
      </NavigationProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
