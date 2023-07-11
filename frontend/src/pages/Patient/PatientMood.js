import React, { useEffect, useState } from "react"
import Calendar from "react-calendar"
import AccountButton from "../../components/Account/AccountButton"
import Mood_Header from "../../components/Mood/Mood_Header"
import Mood_Notepad from "../../components/Mood/Mood_Notepad"
import Navbar from "../../components/Navbar"
import "../../styles/Mood/Mood.css"
import {
  checkMoodInputToday,
  dayUsermood,
} from "../../utils/private/invokeBackend"

function PatientMood() {
  const [mood, setMood] = useState("")
  const [calendarEntry, setCalendarEntry] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)

  // for input of todays mood
  const [entry, setEntry] = useState("")
  const [inputToday, setInputToday] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkMoodInputToday()
      setInputToday(data)
    }
    fetchData()
  }, [])

  async function fetchEntry(date) {
    try {
      console.log("check")
      console.log(date)
      // convert Date to simple date string
      const dateStr =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      console.log(dateStr)
      const response = await dayUsermood({ date: dateStr })
      const data = await response.data
      console.log(data)
      if (data.valid) {
        console.log(data.mood.entry)
        setCalendarEntry(data.mood.entry)
        setMood(data.mood.mood)
      } else {
        setCalendarEntry("No entry for selected date.")
        setMood("")
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const clickDayHandler = (date) => {
    setSelectedDate(date)
    fetchEntry(date)
  }

  const today = new Date()

  return (
    <div className="Mood">
      <Navbar inputToday={inputToday} />
      <Mood_Header />
      <div className="mood-body">
        <Calendar onClickDay={clickDayHandler} />

        <div className="notepad-and-save">
          {selectedDate ? (
            <Mood_Notepad
              entry={calendarEntry}
              setEntry={setCalendarEntry}
              date={selectedDate.toDateString()}
            />
          ) : (
            <Mood_Notepad
              setEntry={setCalendarEntry}
              date={today.toDateString()}
            />
          )}
          <div className="text-and-save">
            <div className="mood-text">Mood: {mood}</div>
          </div>
        </div>

        {!inputToday && (
          <div className="notepad-and-save">
            {/* {selectedDate ? (
              <Mood_Notepad
                entry={entry}
                setEntry={setEntry}
                date={selectedDate.toDateString()}
              />
            ) : ( */}
            <Mood_Notepad setEntry={setEntry} date={today.toDateString()} />
            {/* )} */}
            <div className="text-and-save">
              <div className="save-mood">
                <AccountButton
                  text="Save"
                  entry={entry}
                  setInputToday={setInputToday}
                />
              </div>
            </div>
          </div>
        )}
        {inputToday && (
          <div className="good-job">
            You have inputted your diary entry for the day. Keep up the streak!
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientMood
