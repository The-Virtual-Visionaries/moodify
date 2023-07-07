import React from "react"
import { useNavigate } from "react-router-dom"
import Dashboard_Icon from "../../components/Homepage/Dashboard_Icon"
import Navbar from "../../components/Navbar"
import blueWavesImage from '../../assets/blue-waves.svg'
import purpleWavesImage from '../../assets/purple-waves.svg'
import greenWavesImage from '../../assets/green-waves.svg'
import lightBlueWavesImage from '../../assets/light-blue-waves.svg'
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
          <Dashboard_Icon onClick={moodHandler} text="Track your mood!" backgroundImage={blueWavesImage}/>
          <Dashboard_Icon onClick={gratefulHandler} text="Your Grateful List" backgroundImage={purpleWavesImage}/>
        </div>
        <div className="dashboard-bottom">
          <Dashboard_Icon onClick={consultHandler} text="Video call" backgroundImage={greenWavesImage}/>
          <Dashboard_Icon onClick={resourcesHandler} text="Resources" backgroundImage={lightBlueWavesImage}/>
        </div>
      </div>
    </>
  )
}

export default PatientHomepage
