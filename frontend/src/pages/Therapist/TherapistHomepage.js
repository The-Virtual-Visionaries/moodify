import TherapistConsultSlots from "../../components/TherapistConsult/TherapistConsultSlots";
import TherapistNavbar from "../../components/TherapistNavbar"
import "../../styles/Therapists/Therapists.css"

const TherapistHomepage = () => {
    const consultationSlots = [
        { date: new Date("2023-07-11 09:00:00"), name: "Dr. Tan" },
        { date: new Date("2023-07-12 10:00:00"), name: "Dr. Chan" },
    ];
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
