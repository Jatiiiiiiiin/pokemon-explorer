"\"use client"

import { Component } from "react"
import "./ErrorBoundary.css"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
    console.error("ErrorBoundary caught an error", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-content">
            <h2 className="error-title">Something went wrong</h2>
            <p className="error-message">We're sorry, but there was an error loading this part of the application.</p>
            <button
              className="error-button"
              onClick={() => {
                this.setState({ hasError: false })
                window.location.href = "/"
              }}
            >
              Go to Home Page
            </button>
            {this.props.renderError && this.props.renderError(this.state.error)}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
