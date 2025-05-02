"use client"

import React from "react"

import { createContext, useState, useCallback } from "react"

export const NavigationContext = createContext()

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("home")
  const [params, setParams] = useState({})
  const [state, setState] = useState({})

  const navigate = useCallback((to, newParams = {}, newState = {}) => {
    setCurrentPage(to)
    setParams(newParams)
    setState(newState)
    window.scrollTo(0, 0)
  }, [])

  return (
    <NavigationContext.Provider value={{ currentPage, params, state, navigate }}>{children}</NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = React.useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
