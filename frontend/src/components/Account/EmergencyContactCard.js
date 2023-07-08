import React from "react"
import "../../styles/Account/EmergencyContactCard.css"

function EmergencyContactCard({ emergencyContact }) {
  return (
    <div className="emergency-contact-card">
      <div className="name-and-edit">
        {emergencyContact.name || "N/A"}
        <button
          style={{
            backgroundColor: "#48B3FF",
            borderRadius: "50px",
            borderColor: "transparent",
            padding: "0.5vw",
            color: "white",
            width: "10vw",
          }}
          data-bs-toggle="modal"
          data-bs-target="#emergencyModal"
        >
          Edit
        </button>
      </div>
      <div>
        <div className="emergency-detail">
          {emergencyContact.mobile || "N/A"}
        </div>
        <div className="emergency-detail">
          {emergencyContact.email || "N/A"}
        </div>
      </div>
    </div>
  )
}

export default EmergencyContactCard
