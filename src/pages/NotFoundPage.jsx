"use client"

import { useNavigation } from "../contexts/NavigationContext"
import "./NotFoundPage.css"

function NotFoundPage() {
  const { navigate } = useNavigation()

  return (
    <div className="not-found-page">
      <h2 className="not-found-title">404 - Page Not Found</h2>
      <p className="not-found-message">The page you are looking for doesn't exist or has been moved.</p>
      <button className="button" onClick={() => navigate("home")}>
        Go to Home Page
      </button>
    </div>
  )
}

export default NotFoundPage
