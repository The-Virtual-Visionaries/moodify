import GratefulHeader from "../../components/Grateful/GratefulHeader"
import GratefulItem from "../../components/Grateful/GratefulItem"
import Navbar from "../../components/Navbar"
import "../../styles/Grateful/Grateful.css"

function PatientGrateful() {
  return (
    <div className="Grateful">
      <Navbar streak='number'/>
      <GratefulHeader />
      <GratefulItem />
    </div>
  )
}

export default PatientGrateful
