import { useAuth } from "../hooks/useAuth"
import PatientHomepage from "./Patient/PatientHomepage"
import TherapistHomepage from "./Therapist/TherapistHomepage"

function Homepage() {
  const { role } = useAuth()

  if (role === "Therapist") {
    return <TherapistHomepage />
  } else if (role === "Patient") {
    return <PatientHomepage />
  }
}

export default Homepage
