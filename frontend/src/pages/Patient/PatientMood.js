import { useState } from "react";
import Mood_Header from "../../components/Mood/Mood_Header";
import Navbar from "../../components/Navbar";
import React from "react";
import Calendar from "react-calendar";
import AccountButton from "../../components/Account/AccountButton";
import "../../styles/Mood/Mood.css";
import Mood_Notepad from "../../components/Mood/Mood_Notepad";
import { addUsermood } from "../../utils/private/invokeBackend";

function PatientMood() {
  const moodButtonHandler = (entry) => {
    addUsermood({ entry: entry });
  };

  return (
    <div className="Mood">
      <Navbar />
      <Mood_Header />
      <div className="mood-body">
        <Calendar />
        <div className="notepad">
          <Mood_Notepad />
          <div className="save-mood">
            <AccountButton text="Save" />
            <button
              onClick={() => moodButtonHandler("apple makes me happy")}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientMood;
