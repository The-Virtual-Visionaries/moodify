import Navbar from "../../../components/Navbar";
import ScheduleConsultationForm from "../../../components/Consult/ScheduleConsultationForm";
import "../../../styles/Consult/Form.css"

export default function ScheduleConsult() {
    return (
        <>
            <Navbar />
            <h1 style={{ alignItems: "center", justifyContent: 'center', marginTop: "10px", textAlign: "center", borderRadius: "1px"}}>Schedule Consult</h1>
            <div className="container-box"></div>
            <ScheduleConsultationForm />
        </>
    )
}