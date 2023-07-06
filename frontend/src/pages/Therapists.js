import React from "react"
import Navbar from "../components/Navbar"
import AvailableTherapistCard from "../components/Therapists/AvailableTherapistCard"
import "../styles/Therapists/Therapists.css"

function Therapists() {
  return (
    <div className="Therapists">
      <Navbar />
      <div className="available-therapists">
        <div className="available-therapists-header">
          <h1>Pick Your Therapist</h1>
        </div>
        {/* card to appear when therapists sign up */}
        <AvailableTherapistCard />
        <AvailableTherapistCard />
      </div>
    </div>
  )
}

export default Therapists
