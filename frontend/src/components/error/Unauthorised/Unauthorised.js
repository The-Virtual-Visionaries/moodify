import { useNavigate } from "react-router-dom"

const Unauthorised = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>401 - Unauthorised</h1>
      <p>
        You are not authorised to view this page. Sign up or log in with an
        appropriate account to continue.
      </p>
      <button onClick={() => navigate("/login")}>Log in</button>
      <button onClick={() => navigate("/signup")}>Sign up</button>
    </div>
  )
}

export default Unauthorised
