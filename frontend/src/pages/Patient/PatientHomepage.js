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

  const resourcesHandler = () => {
    navigate("/resources")
  }

  const consultHandler = () => {
    navigate("/consult")
  }

  return (
    <>
      <Navbar />
      {/* to change test and number to user info */}
      <Home_Header name="test" streak="number" />
      <div className="dashboard">
        <div className="dashboard-top">
          <Dashboard_Icon onClick={moodHandler} text="Track your mood!" />
          <Dashboard_Icon onClick={gratefulHandler} text="Your grateful list" />
        </div>
        <div className="dashboard-bottom">
          <Dashboard_Icon onClick={consultHandler} text="video call" />
          <Dashboard_Icon onClick={resourcesHandler} text="resources" />
        </div>
      </div>
    </>
  )
}

export default PatientHomepage
