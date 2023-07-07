import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import "../../../styles/Consult/Consult.css";
import ConsultationSlots from "../../../components/Consult/ConsultationSlots";
import conferencingGIF from "../../../assets/conferencing.gif";
import { getSortedUpcoming } from "../../../utils/private/invokeBackend";

export default function JoinConsult() {
  // Retrieve the latest consultation session from the database

  const consultationSlots = [
    { date: new Date("2023-07-11 09:00:00"), name: "Dr. Tan" },
    { date: new Date("2023-07-12 10:00:00"), name: "Dr. Chan" },
  ];
  const [consult, startConsult] = useState(false);
  //   const [consultationSlots, setConsultationSlots] = useState([]);

  //   useEffect(() => {
  //     getMeetingsData();
  //   }, []);

  //   const getMeetingsData = async () => {
  //     console.log("here");
  //     const meetingData = await getSortedUpcoming({ isUser: true });
  //     console.log(meetingData.data);
  //     setConsultationSlots(meetingData.data);
  //   };

  const startConsultation = () => {
    startConsult(true);
  };

  return (
    <>
      <Navbar />
      <div className="background-env">
        {!consult && (
          <ConsultationSlots
            startConsultation={startConsultation}
            consultationSlots={consultationSlots}
          />
        )}
        {consult && (
          <img
            src={conferencingGIF}
            alt="Conferencing"
            className="video-conferencing"
          />
        )}
      </div>
    </>
  );
}
