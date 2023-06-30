import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

function ProtectedRoute({ children }) {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to="/401" />
  }

  return children
}

export default ProtectedRoute
