import { useNavigate } from "react-router-dom"
import GenericButton from "../../components/Account/GenericButton"
export default function ConsultationSlots({ startConsultation, slot }) {
  const startDate = new Date(slot["startDate"])
  const endDate = new Date(slot["endDate"])
  const startDay = startDate.getDate()
  const startMonth = startDate.toLocaleString("default", { month: "long" })
  const startYear = startDate.getFullYear()
  const endDay = endDate.getDate()
  const endMonth = endDate.toLocaleString("default", { month: "long" })
  const endYear = endDate.getFullYear()

  function getDayWithSuffix(day) {
    if (day >= 11 && day <= 13) {
      return day + "th"
    }
    switch (day % 10) {
      case 1:
        return day + "st"
      case 2:
        return day + "nd"
      case 3:
        return day + "rd"
      default:
        return day + "th"
    }
  }

  const formattedStartDate =
    getDayWithSuffix(startDay) + " " + startMonth + " " + startYear
  const formattedEndDate =
    getDayWithSuffix(endDay) + " " + endMonth + " " + endYear
  const navigate = useNavigate()

  function checkNearingSlot() {
    // Check if the slot is nearing
    // If it is nearing, then show a popup screen
    // If it is not nearing, then do nothing
    let currentDateTime = new Date()
    let slotDateTime = new Date(slot["startDate"])
    let timeDifference = slotDateTime.getTime() - currentDateTime.getTime()
    // only allow if the time difference is 10mins or less
    if (timeDifference <= 600000) {
      startConsultation()
    } else {
      startConsultation()
      // alert("You can only join the consultation 10 minutes before the scheduled time.")
    }
  }
  return (
    <>
      <div className="hero-unit center-content">
        <div className="schedule-detail">
          <h1>
            {/* if same date then just display start date, else display both */}
            {formattedStartDate === formattedEndDate
              ? formattedStartDate
              : formattedStartDate + " - " + formattedEndDate}
            <br />
            <div style={{ fontSize: "30px" }}>
              {startDate.toLocaleTimeString("en-US", time_options)} -{" "}
              {endDate.toLocaleTimeString("en-US", time_options)}
            </div>
          </h1>
          <p>Therapist: {slot["name"]}</p>
          <p>Topic: {slot["topic"]}</p>
        </div>
        <p>
          <GenericButton text="Join Now" onClick={checkNearingSlot} />
        </p>
      </div>
    </>
  )
}

const time_options = {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
}
