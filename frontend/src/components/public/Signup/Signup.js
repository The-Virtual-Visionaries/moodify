import { useState } from "react"
import { signupUser } from "../../../utils/public/invokeBackend"
import styles from "../../../styles/signuplogin.module.css"
import { useNavigate } from "react-router-dom"
import LandingpageNavbar from "../../Landingpage/LandingpageNavbar"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState(null)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const response = await signupUser({
        name,
        email,
        password,
        role,
      })

      if (response) {
        setMessage("User signed up successfully. Please log in.")
        navigate('/login')
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      )
    }
  }

  const handleRoleSelection = (role) => {
    setRole(role)
  }

  return (
    <div className={styles.signup}>
      <div className={styles.form}>
        <LandingpageNavbar/>
        {!role ? (
          <div className={styles.therapistoruser}>
            <button
              className={styles.button}
              onClick={() => handleRoleSelection("Therapist")}
            >
              SIGN UP AS THERAPIST
            </button>
            <button
              className={styles.button}
              onClick={() => handleRoleSelection("Patient")}
            >
              SIGN UP AS USER
            </button>
          </div>
        ) : (
            <form onSubmit={handleSignup}>
              <div className={styles.signupinputs}>
                <div className={styles.loginheader}>Sign Up</div>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className={styles.submitButton} type="submit">
                  SIGN UP
                </button>
              </div>
            </form>
        )}
        {message && <div className={styles.success}>{message}</div>}
      </div>
    </div>
  )
}

export default Signup
