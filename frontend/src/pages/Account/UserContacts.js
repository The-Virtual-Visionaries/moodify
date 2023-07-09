import { useState, useEffect } from "react"
import EmergencyContactCard from "../../components/Account/EmergencyContactCard"
import SidePage from "../../components/Account/SidePage"
import TherapistCard from "../../components/Account/TherapistCard"
import Navbar from "../../components/Navbar"
import AvailableTherapistCard from "../../components/Therapists/AvailableTherapistCard"
import "../../styles/Account/UserContacts.css"
import {
  getPatient,
  getTherapists,
  assignTherapist,
  unassignTherapist,
  putEmergencyContact,
} from "../../utils/private/invokeBackend"

function UserContacts() {
  const [selectedTherapist, setSelectedTherapist] = useState(null)
  const [patient, setPatient] = useState({})
  const [availableTherapists, setAvailableTherapists] = useState([])

  useEffect(() => {
    async function fetchUserData() {
      try {
        const fetchedPatient = await getPatient()
        setPatient(fetchedPatient.data)
        if (!patient.therapist) {
          const fetchedTherapists = await getTherapists()
          setAvailableTherapists(fetchedTherapists.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserData()
  }, [patient])

  const handleTherapistCardClick = (therapistId) => {
    setSelectedTherapist(therapistId)
  }

  const handlePickButtonClick = async () => {
    if (selectedTherapist) {
      await assignTherapist({ id: selectedTherapist })
      const updatedPatient = await getPatient()
      setPatient(updatedPatient)
      setSelectedTherapist(null)
    } else {
      console.log("No therapist selected")
    }
  }

  const handleTherapistRemoval = async () => {
    try {
      await unassignTherapist({ id: patient.therapist.userId })
      const updatedPatient = await getPatient()
      setPatient(updatedPatient)
    } catch (error) {
      console.error(error)
    }
  }

  const handleEmergencyContactSave = async () => {
    try {
      const name = document.getElementById("emergencyContactName").value
      const mobile = document.getElementById("emergencyContactMobile").value
      const email = document.getElementById("emergencyContactEmail").value

      const data = {
        emergencyContact: {
          name: name,
          mobile: mobile,
          email: email,
        },
      }

      await putEmergencyContact(data)
      const updatedPatient = await getPatient()
      setPatient(updatedPatient)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="UserContacts">
      <Navbar streak="number" />
      <div className="user-contacts">
        <SidePage contactColor="#708FE0" contactBorder="1px solid #708FE0" />
        <div className="contacts">
          <h1>Contact Settings</h1>
          <div className="User-Therapists">
            <div className="header-and-add">
              <h3>My Therapist</h3>
              {patient.therapist ? (
                <></>
              ) : (
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#therapistModal"
                  data-bs-whatever="@mdo"
                  style={{
                    padding: "2vh",
                    backgroundColor: "#55B6B0",
                    color: "white",
                    fontSize: "2vw",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    border: "none",
                    textAlign: "center",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  +
                </button>
              )}
              <div
                class="modal fade"
                id="therapistModal"
                tabIndex="-1"
                aria-labelledby="therapistModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="therapistModalLabel">
                        Pick your therapist
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div
                      class="modal-body"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {availableTherapists.map((therapist, index) => (
                        <AvailableTherapistCard
                          key={index}
                          name={therapist.name}
                          contactNumber={therapist.profile?.mobile || "N/A"}
                          address={therapist.profile?.address || "N/A"}
                          isPicked={selectedTherapist === therapist.userId}
                          onClick={() =>
                            handleTherapistCardClick(therapist.userId)
                          }
                        />
                      ))}
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        style={{ borderRadius: "50px" }}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        style={{
                          backgroundColor: "#48B3FF",
                          borderRadius: "50px",
                          borderColor: "transparent",
                          padding: "0.5vw",
                          color: "white",
                          width: "10vw",
                        }}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handlePickButtonClick}
                      >
                        Pick
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {patient.therapist && (
              <TherapistCard
                name={patient.therapist.name}
                contactNumber={patient.therapist.profile?.mobile || "N/A"}
                address={patient.therapist.profile?.address || "N/A"}
                onClick={handleTherapistRemoval}
              />
            )}
          </div>
          <div className="EmergencyContact">
            <div className="header-and-add">
              <h3>My Emergency Contact</h3>
              <div
                class="modal fade"
                id="emergencyModal"
                tabIndex="-1"
                aria-labelledby="emergencyModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="emergencyModalLabel">
                        Emergency Contact Details
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label
                            htmlFor="emergencyContactName"
                            class="col-form-label"
                          >
                            Name:
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="emergencyContactName"
                          ></input>
                        </div>
                        <div class="mb-3">
                          <label
                            htmlFor="emergencyContactMobile"
                            class="col-form-label"
                          >
                            Mobile Number:
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="emergencyContactMobile"
                          ></input>
                        </div>
                        <div class="mb-3">
                          <label
                            htmlFor="emergencyContactEmail"
                            class="col-form-label"
                          >
                            Email:
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="emergencyContactEmail"
                          ></input>
                        </div>
                      </form>
                    </div>

                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                        style={{ borderRadius: "50px" }}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        style={{
                          backgroundColor: "#48B3FF",
                          borderRadius: "50px",
                          borderColor: "transparent",
                          padding: "0.5vw",
                          color: "white",
                          width: "10vw",
                        }}
                        onClick={handleEmergencyContactSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {patient.emergencyContact && (
              <EmergencyContactCard
                emergencyContact={patient.emergencyContact}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserContacts
