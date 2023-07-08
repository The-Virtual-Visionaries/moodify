import "../../styles/Therapists/AvailableTherapistsCard.css"

function AvailableTherapistCard({
  name,
  contactNumber,
  address,
  styles,
  isPicked,
  onClick,
}) {
  const cardStyle = {
    ...styles,
    border: isPicked ? "2px solid #55B6B0" : "1px solid #48B3FF",
  }

  return (
    <div
      className="available-therapist-card"
      style={cardStyle}
      onClick={onClick}
    >
      <div className="therapist-name">{name}</div>
      <div className="therapist-detail">{contactNumber}</div>
      <div className="therapist-detail">{address}</div>
    </div>
  )
}

export default AvailableTherapistCard
