import { createContext, useContext, useMemo } from "react"
import { useLocalStorage } from "./useLocalStorage"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useLocalStorage("authData", null)

  const login = async (data) => {
    setAuthData(data)
  }

  const logout = () => {
    setAuthData(null)
  }

  const value = useMemo(
    () => ({
      token: authData?.token,
      role: authData?.role,
      login,
      logout,
    }),
    [authData]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
