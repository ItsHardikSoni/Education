import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

// Use environment variables for credentials (should be in .env file)
const ADMIN_ID = import.meta.env.VITE_ADMIN_ID
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    // Use HttpOnly cookie instead of localStorage for better security
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth', { credentials: 'include' })
        setIsAuthenticated(response.ok)
      } catch (error) {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (id, password) => {
    // Ensure environment variables are properly set
    if (!ADMIN_ID || !ADMIN_PASS) {
      console.error('Admin credentials not properly configured in .env file');
      return false;
    }

    // Strict comparison with environment variables
    if (id === ADMIN_ID && password === ADMIN_PASS) {
      await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password })
      })
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = async () => {
    await fetch('/api/logout', { credentials: 'include' })
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)