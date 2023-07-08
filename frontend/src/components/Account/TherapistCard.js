import React from "react"
import "../../styles/Account/TherapistCard.css"
import AccountButton from "./AccountButton"

function TherapistCard({ name, contactNumber, address, onClick }) {
  return (
    <div className="therapist-card">
      <div className="name-and-edit">
        <div className="therapist-name">{name}</div>
        <AccountButton text="Delete" onClick={onClick} />
      </div>
      <div>
        <div className="therapist-detail">{contactNumber}</div>
        <div className="therapist-detail">{address}</div>
      </div>
    </div>
  )
}

export default TherapistCard
