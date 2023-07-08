import { useState } from "react";
import Mood_Header from "../../components/Mood/Mood_Header";
import Navbar from "../../components/Navbar";
import React from "react";
import Calendar from "react-calendar";
import AccountButton from "../../components/Account/AccountButton";
import "../../styles/Mood/Mood.css";
import Mood_Notepad from "../../components/Mood/Mood_Notepad";

function PatientMood() {
  const [entry, setEntry] = useState("");

  return (
    <div className="Mood">
      <Navbar />
      <Mood_Header />
      <div className="mood-body">
        <Calendar />
        <div className="notepad">
          <Mood_Notepad setEntry={setEntry} />
          <div className="save-mood">
            <AccountButton text="Save" entry={entry} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientMood;
