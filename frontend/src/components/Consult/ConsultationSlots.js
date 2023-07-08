import ConsultationSlot from "./ConsultationSlot";

export default function ConsultationSlots({ startConsultation, consultationSlots }) {
    return (
        <div className="centered-container">
            <p className="title-name">Your Scheduled Consultations!</p>
            <div className="consult-slots">
                {consultationSlots.map((slot, index) => (
                    <ConsultationSlot
                        key={index}
                        startConsultation={startConsultation}
                        slot={slot} // Adjust the padding as needed
                    />
                ))}
            </div>
        </div>
    )
};