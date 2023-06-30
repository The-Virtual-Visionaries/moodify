import React from "react"
import { useNavigate } from "react-router-dom"
import Dashboard_Icon from "../../components/Homepage/Dashboard_Icon"
import Home_Header from "../../components/Homepage/Home_Header"
import Navbar from "../../components/Navbar"
import "../../styles/Homepage/Homepage.css"

function PatientHomepage() {
  const navigate = useNavigate()
  const moodHandler = () => {
    navigate("/mood")
  }

  const gratefulHandler = () => {
    navigate("/grateful")
  }

  return (
    <>
      <Navbar />
      {/* to change test and number to user info */}
      <Home_Header name="test" streak="number" />
      <div className="dashboard">
        <div className="dashboard-top">
          <Dashboard_Icon onClick={moodHandler} text="mood" />
          <Dashboard_Icon onClick={gratefulHandler} text="grateful" />
        </div>
        <div className="dashboard-bottom">
          <Dashboard_Icon text="video call" />
          <Dashboard_Icon text="resources" />
        </div>
      </div>
    </>
  )
}

export default PatientHomepage
