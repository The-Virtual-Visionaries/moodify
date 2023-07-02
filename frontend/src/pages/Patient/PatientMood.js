import { useState } from "react"
import MoodConfirmButton from "../../components/Mood/MoodConfirmButton"
import Mood_Button from "../../components/Mood/Mood_Button"
import Mood_Header from "../../components/Mood/Mood_Header"
import Navbar from "../../components/Navbar"
import "../../styles/Mood/Mood.css"

function PatientMood() {
  const [selectedMood, setSelectedMood] = useState(null)
  const moodButtonHandler = (mood) => {
    setSelectedMood(mood)
  }

  return (
    <div className="Mood">
      <Navbar />
      <Mood_Header />
      <div className="mood-buttons">
        <Mood_Button
          mood="HAPPY"
          isSelected={selectedMood == "joy"}
          onClick={() => moodButtonHandler("joy")}
        />
        <Mood_Button
          mood="ANGRY"
          isSelected={selectedMood == "anger"}
          onClick={() => moodButtonHandler("anger")}
        />
        <Mood_Button
          mood="FEARFUL"
          isSelected={selectedMood == "fear"}
          onClick={() => moodButtonHandler("fear")}
        />
        <Mood_Button
          mood="NEUTRAL"
          isSelected={selectedMood == "neutral"}
          onClick={() => moodButtonHandler("neutral")}
        />
        <Mood_Button
          mood="DISGUSTED"
          isSelected={selectedMood == "disgusted"}
          onClick={() => moodButtonHandler("disgusted")}
        />
        <Mood_Button
          mood="SURPRISED"
          isSelected={selectedMood == "surprised"}
          onClick={() => moodButtonHandler("surprised")}
        />
        <Mood_Button
          mood="SAD"
          isSelected={selectedMood == "sad"}
          onClick={() => moodButtonHandler("sad")}
        />
      </div>
      <MoodConfirmButton />
    </div>
  )
}

export default PatientMood
