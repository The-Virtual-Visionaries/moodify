import ConsultationSlot from "./ConsultationSlot";

export default function ConsultationSlots({ startConsultation, consultationSlots }) {
    return (
        <div className="centered-container">
            <p className="title-name">These are your scheduled consultations!</p>
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
// 