import { useState } from "react"
import { signupUser } from "../../../utils/public/invokeBackend"
import styles from "../../../styles/signuplogin.module.css"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState(null)
  const [message, setMessage] = useState("")

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
    <div className={styles.form}>
      {!role ? (
        <div>
          <button
            className={styles.button}
            onClick={() => handleRoleSelection("Therapist")}
          >
            Sign up as Therapist
          </button>
          <button
            className={styles.button}
            onClick={() => handleRoleSelection("Patient")}
          >
            Sign up as Patient
          </button>
        </div>
      ) : (
        <form onSubmit={handleSignup}>
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
            Sign Up
          </button>
        </form>
      )}
      {message && <div className={styles.success}>{message}</div>}
    </div>
  )
}

export default Signup
