import PatientGrateful from "./Patient/PatientGrateful"
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

function Grateful() {
  const { role } = useAuth()

  if (role === "Patient") {
    return <PatientGrateful />
  }

  return <Navigate to="/401" />
}

export default Grateful
