import PatientMood from "./Patient/PatientMood"
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"

function Mood() {
  const { role } = useAuth()

  if (role === "Patient") {
    return <PatientMood />
  }

  return <Navigate to="/401" />
}

export default Mood
