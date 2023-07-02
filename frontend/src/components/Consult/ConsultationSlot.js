import react from "react";
import { useNavigate } from "react-router-dom";
export default function ConsultationSlots({ startConsultation, slot }) {
    const navigate = useNavigate();

    function checkNearingSlot() {
        // Check if the slot is nearing
        // If it is nearing, then show a popup screen
        // If it is not nearing, then do nothing
        let currentDateTime = new Date();
        let slotDateTime = new Date(slot['date']);
        let timeDifference = slotDateTime.getTime() - currentDateTime.getTime();
        // only allow if the time difference is 10mins or less
        if (timeDifference <= 600000) {
            startConsultation();
        } else {
            startConsultation();
            // alert("You can only join the consultation 10 minutes before the scheduled time.")
        }
    }
    return (
        <>
            <div className="hero-unit center-content">
                <h1>{slot['date'].toDateString()}</h1>
                <p>{slot['name']}</p>
                <p>
                    <button 
                        className="btn btn-primary"
                        onClick={checkNearingSlot}>
                        Join Now
                    </button>
                </p>
            </div>
        </>
    )
}