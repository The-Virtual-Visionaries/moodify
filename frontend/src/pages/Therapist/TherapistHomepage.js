import { useEffect, useState } from "react";
import TherapistConsultSlots from "../../components/TherapistConsult/TherapistConsultSlots";
import TherapistNavbar from "../../components/TherapistNavbar"
import "../../styles/Therapists/Therapists.css"
// import { getSortedUpcoming } from "../../utils/private/invokeBackend";

const TherapistHomepage = () => {
    let [consultationSlots, setConsultationSlots] = useState([]);

    consultationSlots = [
        { date: new Date("2023-07-11 09:00:00"), name: "Dr. Tan" },
        { date: new Date("2023-07-12 10:00:00"), name: "Dr. Chan" },
    ];

    // useEffect(() => {
    //   async function fetchMeetings() {
    //     const upcomingMeetings = await getSortedUpcoming();
    //     setConsultationSlots(upcomingMeetings);
    //     if (upcomingMeetings === []) {
    //         return;
    //     }
    //   }
    //   fetchMeetings();
    // }, []);

    return (
        <>
            <TherapistNavbar />
            <div className="meetings-container">
                <div className="meetings">
                    <h1>Meetings</h1>
                </div>
                <TherapistConsultSlots
                    consultationSlots={consultationSlots}
                />
            </div>
        </>
    )
}

export default TherapistHomepage
