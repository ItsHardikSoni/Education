import { createContext, useContext, useState } from 'react'
import { supabase } from '../context/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (email, password) => {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
  
    console.log("All rows in admin_users:", data, error)
  
    return false
  }
  

  const logout = () => setIsAuthenticated(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
