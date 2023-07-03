import ConsultationSlot from "./ConsultationSlot";

export default function ConsultationSlots({ startConsultation, consultationSlots }) {
    return (
        <div style={{ display: 'inline-block'}}>
            {consultationSlots.map((slot, index) => (
                <ConsultationSlot
                    key={index}
                    startConsultation={startConsultation}
                    slot={slot}
                    style={{ 
                        marginBottom: '10px',
                        "padding-bottom": "20px" }} // Adjust the padding as needed
                />
            ))}
        </div>
    )
};
// 