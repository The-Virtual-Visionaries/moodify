import TherapistConsultSlot from "./TherapistConsultSlot"

export default function TherapistConsultSlots({ consultationSlots }) {
  return (
    <div className="centered-container">
      <p className="title-name">These are your scheduled consultations!</p>
      <div className="consult-slots">
        {consultationSlots.map((slot, index) => (
          <TherapistConsultSlot
            key={index}
            slot={slot} // Adjust the padding as needed
          />
        ))}
      </div>
    </div>
  )
}
