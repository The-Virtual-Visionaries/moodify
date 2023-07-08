import TherapistNavbar from "../../components/TherapistNavbar";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom"
import conferencing from "../../assets/conferencing.gif";
import "../../styles/Therapists/Therapists.css"
export default function TherapistConsult() {
    const { role } = useAuth();
    if (role === "Therapist") {
        return <>
            <TherapistNavbar />
            <div className="consultation-slot">
                <div className="centered-content">
                    <h1 style={{ textAlign: "center" }}>Consultation</h1>
                    <div className="consultation-video">
                        <img src={conferencing} alt="Therapist Consult" />
                    </div>
                </div>
            </div>


        </>
    }
    return <Navigate to="/401" />
}