import { createContext, useContext, useState } from 'react'
import { supabase } from '../context/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email, password) => {
    console.log("Trying to login with:", email, password)

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single()

      console.log("Supabase response:", { data, error })

    if (error || !data) {
      // console.error(error?.message || 'Invalid credentials')
      return false
    }

    setIsAuthenticated(true)
    return true
  }

  const logout = () => setIsAuthenticated(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
