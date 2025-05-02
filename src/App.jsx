import { useNavigation } from "./contexts/NavigationContext"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import DetailPage from "./pages/DetailPage"
import FavoritesPage from "./pages/FavoritesPage"
import ComparePage from "./pages/ComparePage"
import NotFoundPage from "./pages/NotFoundPage"
import "./App.css"

function App() {
  const { currentPage } = useNavigation()

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />
      case "detail":
        return <DetailPage />
      case "favorites":
        return <FavoritesPage />
      case "compare":
        return <ComparePage />
      case "404":
        return <NotFoundPage />
      default:
        return <NotFoundPage />
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">{renderPage()}</div>
      </main>
    </div>
  )
}

export default App
