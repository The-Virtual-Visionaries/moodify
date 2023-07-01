import { useState } from "react"
import "../../styles/Consult/Consult.css"
import Navbar from "../../components/Navbar"
import conferencingGIF from "../../assets/conferencing.gif"
import { ConsultWelcomeHeader } from "../../components/Consult/ConsultWelcomeHeader"
import supportSystem from "../../assets/support_system.svg";


export default function PatientConsult() {
    // Show a popup screen whenever the user clicks on the "Schedule" button
    const [schedule, setSchedule] = useState(false);
    const showWelcome = true;
    return (
        <>
            <Navbar />
            { showWelcome && <ConsultWelcomeHeader />}
            <div className="meeting">
                {/* <img src={conferencingGIF}></img> */}
            </div>
            <img src={supportSystem} alt="support system" className="support-system"/>
        </>
    )
}