import { useNavigate } from "react-router-dom";
import JoinConsult from "../../pages/Patient/PatientConsult/JoinConsult";
export default function TherapistConsultSlot({ slot }) {

    const day = slot['date'].getDate();
    const month = slot['date'].toLocaleString('default', { month: 'long' });
    const year = slot['date'].getFullYear();

    function getDayWithSuffix(day) {
        if (day >= 11 && day <= 13) {
            return day + 'th';
        }
        switch (day % 10) {
            case 1:
                return day + 'st';
            case 2:
                return day + 'nd';
            case 3:
                return day + 'rd';
            default:
                return day + 'th';
        }
    }

    const formattedDate = getDayWithSuffix(day) + ' ' + month + ' ' + year;
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
            navigate("/home/consult");
        } else {
            console.log("You can only join the consultation 10 minutes before the scheduled time.");
            navigate("/home/consult");
        }
    }
    return (
        <>
            <div className="hero-unit center-content">
                <div className="schedule-detail">
                    <h1>
                        {formattedDate}
                        <br />
                        <div style={{"fontSize": "30px"}}>{slot['date'].toLocaleTimeString('en-US', time_options)}</div>
                    </h1>
                    <p>{slot['name']}</p>
                </div>
                <p>
                    <button
                        style={{
                            backgroundColor:'#48B3FF', 
                            borderRadius:'50px', 
                            borderColor:'transparent', 
                            padding:'0.5vw', 
                            color:'white',
                            width:'10vw'
                        }}
                        onClick={checkNearingSlot}>
                        Join Now
                    </button>
                </p>
            </div>
        </>
    )
}

const time_options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
}