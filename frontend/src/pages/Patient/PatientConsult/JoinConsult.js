import { useState } from "react";
import Navbar from "../../../components/Navbar";
import "../../../styles/Consult/Consult.css";
import ConsultationSlots from "../../../components/Consult/ConsultationSlots";
import conferencingGIF from "../../../assets/conferencing.gif"

export default function JoinConsult() {
    // Retrieve the latest consultation session from the database

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
        </>
    )
}