import React from "react"
import { useNavigate } from "react-router-dom"
import Dashboard_Icon from "../../components/Homepage/Dashboard_Icon"
import Navbar from "../../components/Navbar"
import "../../styles/Homepage/Homepage.css"
import Carousell from "../../components/Homepage/Carousell"

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
      <Navbar streak='number'/>
      <Carousell/>
      <div className="quick-links">Quick Links</div>
      <div className="dashboard">
        <div className="dashboard-top">
          <Dashboard_Icon onClick={moodHandler} text="Track your mood!" />
          <Dashboard_Icon onClick={gratefulHandler} text="Your Grateful List" />
        </div>
        <div className="dashboard-bottom">
          <Dashboard_Icon onClick={consultHandler} text="Video call" />
          <Dashboard_Icon onClick={resourcesHandler} text="Resources" />
        </div>
      </div>
    </>
  )
}

export default PatientHomepage
