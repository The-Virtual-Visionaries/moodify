import { useEffect, useState } from "react"
import TherapistConsultSlots from "../../components/TherapistConsult/TherapistConsultSlots"
import TherapistNavbar from "../../components/TherapistNavbar"
import "../../styles/Therapists/Therapists.css"
import { getSortedUpcoming } from "../../utils/private/invokeBackend"

const TherapistHomepage = () => {
  let [consultationSlots, setConsultationSlots] = useState([])

  useEffect(() => {
    getMeetingsData()
  }, [])

  const getMeetingsData = async () => {
    console.log("here")
    const meetingData = await getSortedUpcoming({ isUser: false })
    console.log(meetingData.data)
    setConsultationSlots(meetingData.data)
  }

  return (
    <>
      <TherapistNavbar />
      <div className="meetings-container">
        <br></br>
        <TherapistConsultSlots consultationSlots={consultationSlots} />
      </div>
    </>
  )
}

export default TherapistHomepage
