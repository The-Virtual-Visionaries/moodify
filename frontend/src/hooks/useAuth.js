import { createContext, useContext, useMemo } from "react"
import { useLocalStorage } from "./useLocalStorage"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", null)

  const login = async (data) => {
    setToken(data)
  }

  const logout = () => {
    setToken(null)
  }

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
