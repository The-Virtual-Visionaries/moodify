import { useEffect, useState } from "react";
import Mood_Header from "../../components/Mood/Mood_Header";
import Navbar from "../../components/Navbar";
import React from "react";
import Calendar from "react-calendar";
import AccountButton from "../../components/Account/AccountButton";
import "../../styles/Mood/Mood.css";
import Mood_Notepad from "../../components/Mood/Mood_Notepad";
import {
  checkMoodInputToday,
  dayUsermood,
} from "../../utils/private/invokeBackend";

function PatientMood() {
  const [entry, setEntry] = useState("");
  const [inputToday, setInputToday] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkMoodInputToday();
      setInputToday(data);
    };
    fetchData();
  }, []);

  async function fetchEntry(date) {
    try {
      console.log("check");
      console.log(date);
      // convert Date to simple date string
      const dateStr =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      console.log(dateStr);
      const response = await dayUsermood({ date: dateStr });
      const data = await response.data;
      console.log(data);
      if (data.valid) {
        console.log(data.mood.entry);
        setEntry(data.mood.entry);
        console.log(entry);
      } else {
        setEntry("No entry for selected date.");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const clickDayHandler = (date) => {
    setSelectedDate(date);
    fetchEntry(date);
  };

  const today = new Date();

  return (
    <div className="Mood">
      <Navbar inputToday={inputToday} />
      <Mood_Header />
      <div className="mood-body">
        <Calendar onClickDay={clickDayHandler} />
        {!inputToday && (
          <div className="notepad-and-save">
            {selectedDate ? (
              <Mood_Notepad
                entry={entry}
                setEntry={setEntry}
                date={selectedDate.toDateString()}
              />
            ) : (
              <Mood_Notepad setEntry={setEntry} date={today.toDateString()} />
            )}
            <div className="save-mood">
              <AccountButton
                text="Save"
                entry={entry}
                setInputToday={setInputToday}
              />
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
  );
}

export default PatientMood;
