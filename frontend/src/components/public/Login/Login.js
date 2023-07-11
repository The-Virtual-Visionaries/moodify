import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import styles from "../../../styles/signuplogin.module.css"
import { loginUser } from "../../../utils/public/invokeBackend"
import LandingpageNavbar from "../../Landingpage/LandingpageNavbar"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser({ email, password })
      if (response) {
        login(response.data)
        setMessage("User logged in successfully")
        navigate("/home")
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      )
    }
  }

  return (
    <div className={styles.login}>
      <LandingpageNavbar />
      <div className={styles.form}>
        <form onSubmit={handleLogin}>
          <div className={styles.formlayout}>
            <div className={styles.loginheader}>Login</div>
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
              LOGIN
            </button>
            {message && <div className={styles.success}>{message}</div>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
