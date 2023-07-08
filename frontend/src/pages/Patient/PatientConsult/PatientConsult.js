import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../../styles/Consult/Consult.css"
import Navbar from "../../../components/Navbar"
import conferencingGIF from "../../../assets/conferencing.gif"
import ConsultationSlots from "../../../components/Consult/ConsultationSlots"

export default function PatientConsult() {
    // Show a popup screen whenever the user clicks on the "Schedule" button
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState(false);
    const [joinMeeting, setJoinMeeting] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);


    const scheduleConsult = () => {
        setSchedule(true);
        navigate("/consult/schedule")
    }
    const setJoinMeetingTrue = () => {
        setJoinMeeting(true);
        navigate("/consult/join")
    }
    const toggleWelcome = () => {
        setShowWelcome(!showWelcome);
    }

    const consultationSlots = [
        { date: new Date("2023-07-11 09:00:00"), name: "Dr. Tan" },
        { date: new Date("2023-07-12 10:00:00"), name: "Dr. Chan"}
    ]
    const [consult, startConsult] = useState(false);

    const startConsultation = () => {
        startConsult(true);
    }
    
    return (
        <>
            <Navbar streak='number'/>
            <div className="background-env">
                {!consult && 
                <ConsultationSlots 
                    startConsultation={startConsultation} 
                    consultationSlots={consultationSlots}
                />}
                { consult && <img src={conferencingGIF} alt="Conferencing" className="video-conferencing"/>}
            </div>
            {!consult &&
            <div className="schedule-therapist">
               <button className="schedule-consult-btn" onClick={scheduleConsult}>Schedule Consultation</button>
            </div>
            }
        </>
    )
}