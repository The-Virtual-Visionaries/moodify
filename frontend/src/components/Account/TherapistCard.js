import React from "react"
import "../../styles/Account/TherapistCard.css"
import GenericButton from "./GenericButton"

function TherapistCard({ name, contactNumber, address, onClick }) {
  return (
    <div className="therapist-card">
      <div className="name-and-edit">
        <div className="therapist-name">{name}</div>
        <GenericButton text="Delete" onClick={onClick} />
      </div>
      <div>
        <div className="therapist-detail">{contactNumber}</div>
        <div className="therapist-detail">{address}</div>
      </div>
    </div>
  )
}

export default TherapistCard
