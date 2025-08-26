import { createContext, useContext, useState } from 'react'
import { supabase } from '../context/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

  async function handleLogin(email, password) {
  console.log("Trying to login with:", email, password);

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("email", email.trim())   // remove spaces
    .eq("password", password)    // plain check
    .maybeSingle();              // instead of .single()

  console.log("Supabase response:", { data, error });

  if (error) {
    alert("Login failed: " + error.message);
    return false;
  }

  if (!data) {
    alert("Invalid credentials");
    return false;
  }

  // ✅ Mark user as authenticated
    setIsAuthenticated(true)
    setUser(data)
  return true;
}

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
