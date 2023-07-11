import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import PatientGrateful from "./Patient/PatientGrateful"

function Grateful() {
  const { role } = useAuth()

  if (role === "Patient") {
    return <PatientGrateful />
  }

  return <Navigate to="/401" />
}

export default Grateful
