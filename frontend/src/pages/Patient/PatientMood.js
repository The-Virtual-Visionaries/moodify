import { useEffect, useState } from "react";
import Mood_Header from "../../components/Mood/Mood_Header";
import Navbar from "../../components/Navbar";
import React from "react";
import Calendar from "react-calendar";
import AccountButton from "../../components/Account/AccountButton";
import "../../styles/Mood/Mood.css";
import Mood_Notepad from "../../components/Mood/Mood_Notepad";
import { checkMoodInputToday } from "../../utils/private/invokeBackend";

function PatientMood() {
  const [entry, setEntry] = useState("");
  const [inputToday, setInputToday] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await checkMoodInputToday();
      setInputToday(data);
    };
    fetchData();
  }, []);

  return (
    <div className="Mood">
      <Navbar inputToday={inputToday} />
      <Mood_Header />
      <div className="mood-body">
        <Calendar />
        {!inputToday && (
          <div className="notepad">
            <Mood_Notepad setEntry={setEntry} />
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
