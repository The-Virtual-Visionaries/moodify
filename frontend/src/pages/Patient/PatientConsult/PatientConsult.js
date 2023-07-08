import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/Consult/Consult.css";
import Navbar from "../../../components/Navbar";
import { ConsultWelcomeHeader } from "../../../components/Consult/ConsultWelcomeHeader";
import supportSystem from "../../../assets/support_system.svg";
import ConsultationSlots from "../../../components/Consult/ConsultationSlots";

export default function PatientConsult() {
  // Show a popup screen whenever the user clicks on the "Schedule" button
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(false);
  const [joinMeeting, setJoinMeeting] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const scheduleConsult = () => {
    setSchedule(true);
    navigate("/consult/schedule");
  };
  const setJoinMeetingTrue = () => {
    setJoinMeeting(true);
    navigate("/consult/join");
  };
  const toggleWelcome = () => {
    setShowWelcome(!showWelcome);
  };

  const consultationSlots = [
    { date: new Date("2023-07-11 09:00:00"), name: "Dr. Tan" },
    { date: new Date("2023-07-12 10:00:00"), name: "Dr. Chan" },
  ];
  const [consult, startConsult] = useState(false);

  const startConsultation = () => {
    startConsult(true);
  };

  return (
    <>
      <Navbar />
      <ConsultationSlots
        startConsultation={startConsultation}
        consultationSlots={consultationSlots}
      />
      {showWelcome && (
        <ConsultWelcomeHeader
          toggleWelcome={toggleWelcome}
          scheduleConsult={scheduleConsult}
          setJoinMeetingTrue={setJoinMeetingTrue}
        />
      )}
    </>
  );
}
