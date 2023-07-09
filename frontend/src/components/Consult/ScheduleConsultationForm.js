import React, { useState, useEffect } from "react";
import { scheduleMeeting } from "../../utils/private/invokeBackend";

function ScheduleConsultationForm() {
  //   const [therapists, setTherapists] = useState([]);
  const [showTimeAlert, setShowTimeAlert] = useState(false);
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startDateTime: "",
    endDateTime: "",
    topic: "",
  });
  const therapists = [
    { name: "Merrick", specialization: "Depression", therapistId: "123" },
    { name: "Kavan", specialization: "Anxiety", therapistId: "456" },
    { name: "Dilys", specialization: "Stress", therapistId: "789" },
    { name: "Kevin", specialization: "Relationships", therapistId: "101" },
  ];

  // const getTherapistsData = async () => {
  //   const therapistData = await listTherapists()   (doesnt work since cant directly access Therapist.find)
  //   setTherapists(therapistData.data)
  // }

  // Simulating API call to fetch therapist data
  //   useEffect(() => {
  //     // Replace with your actual API call
  //     const fetchTherapists = async () => {
  //       try {
  //         const response = await fetch('YOUR_API_ENDPOINT');
  //         const data = await response.json();
  //         setTherapists(data); // Assuming the response is an array of therapist objects
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     fetchTherapists();
  //   }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTherapistChange = (e) => {
    setSelectedTherapist(e.target.value);
  };

  const validateTiming = (startDateTime, endDateTime) => {
    if (startDateTime >= endDateTime) {
      return false;
    }
    console.log(startDateTime);
    console.log(endDateTime);
    const duration = (endDateTime - startDateTime) / 1000;
    console.log(duration);

    if (duration > 3600) {
      return false;
    }
    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const startDate = new Date(formData.startDateTime);
    const endDate = new Date(formData.endDateTime);
    const isValidSlot = validateTiming(startDate, endDate);
    formData["therapistId"] = selectedTherapist;
    if (!isValidSlot) {
      return;
    }
    // Do something with the form data and selected therapist, such as passing them to the backend
    const payload = {
      therapistId: selectedTherapist,
      startDate: startDate,
      endDate: endDate,
      topic: formData.topic,
    };
    const data = await scheduleMeeting(payload);
    setLoading(false);
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="startDateTime">Start Date and Time:</label>
          <input
            type="datetime-local"
            id="startDateTime"
            name="startDateTime"
            value={formData.startDateTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="endDateTime">End Date and Time:</label>
          <input
            type="datetime-local"
            id="endDateTime"
            name="endDateTime"
            value={formData.endDateTime}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="therapist">Choose a Therapist:</label>
          <select
            id="therapist"
            name="therapist"
            value={selectedTherapist}
            onChange={handleTherapistChange}
            required
          >
            <option value="">Select a therapist</option>
            {therapists.map((therapist) => (
              <option key={therapist.therapistId} value={therapist.therapistId}>
                {therapist.name} - {therapist.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row center">
          <input
            type="submit"
            value={loading ? "Loading..." : "Submit"}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}

export default ScheduleConsultationForm;
