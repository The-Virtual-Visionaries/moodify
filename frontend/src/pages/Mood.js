import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import PatientMood from "./Patient/PatientMood"

function Mood() {
  const { role } = useAuth()

  if (role === "Patient") {
    return <PatientMood />
  }

  return <Navigate to="/401" />
}

export default Mood
