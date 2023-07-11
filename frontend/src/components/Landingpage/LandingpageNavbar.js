import React from "react"
import "../../styles/Landingpage/LandingpageNavbar.css"

function LandingpageNavbar() {
  return (
    <div className="LandingpageNavbar">
      <img
        src={require("../../assets/moodify-logo-black.png")}
        alt="logo"
        width="100"
        className="tplogo"
      />
    </div>
  )
}

export default LandingpageNavbar
