import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../../styles/Consult/Consult.css"
import Navbar from "../../../components/Navbar"
import { ConsultWelcomeHeader } from "../../../components/Consult/ConsultWelcomeHeader"
import supportSystem from "../../../assets/support_system.svg";


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
    return (
        <>
            <Navbar />
            { showWelcome && 
            <ConsultWelcomeHeader 
                toggleWelcome={toggleWelcome}
                scheduleConsult={scheduleConsult}
                setJoinMeetingTrue={setJoinMeetingTrue}/>}
            <img src={supportSystem} alt="support system" className="support-system"/>
        </>
    )
}