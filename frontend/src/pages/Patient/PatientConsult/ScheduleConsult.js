import ScheduleConsultationForm from "../../../components/Consult/ScheduleConsultationForm"
import Navbar from "../../../components/Navbar"
import "../../../styles/Consult/Form.css"

export default function ScheduleConsult() {
  return (
    <div>
      <Navbar />
      <div className="schedule-consult">
        <h1
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "8vh",
            marginBottom: "5vh",
            textAlign: "center",
            borderRadius: "1px",
          }}
        >
          Schedule Consult
        </h1>
        <ScheduleConsultationForm />
      </div>
    </div>
  )
}
