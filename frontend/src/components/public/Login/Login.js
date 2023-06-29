import React, { useState } from "react"
import { useAuth } from "../../../hooks/useAuth"
import { loginUser } from "../../../utils/public/invokeBackend"
import styles from "../../../styles/signuplogin.module.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const { login } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser({ email, password })
      if (response) {
        login(response.data.token)
        setMessage("User logged in successfully")
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      )
    }
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleLogin}>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.submitButton} type="submit">
          Login
        </button>
      </form>
      {message && <div className={styles.success}>{message}</div>}
    </div>
  )
}

export default Login
