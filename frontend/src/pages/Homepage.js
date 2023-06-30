import PatientHomepage from "./Patient/PatientHomepage"
import TherapistHomepage from "./Therapist/TherapistHomepage"
import { useAuth } from "../hooks/useAuth"

function Homepage() {
  const { role } = useAuth()

  if (role === "Therapist") {
    return <TherapistHomepage />
  } else if (role === "Patient") {
    return <PatientHomepage />
  }

  return <div>test</div>
}

export default Homepage
