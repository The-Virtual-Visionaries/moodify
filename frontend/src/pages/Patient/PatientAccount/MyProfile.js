import React, { useState, useEffect } from "react"
import Navbar from "../../../components/Navbar"
import SidePage from "../../../components/Account/SidePage"
import AccountButton from "../../../components/Account/AccountButton"
import { getProfile, putProfile } from "../../../utils/private/invokeBackend"
import "../../../styles/Account/MyProfile.css"

function MyProfile() {
  const [profile, setProfile] = useState({
    username: "",
    avatar: "",
    mobile: "",
  })

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    getProfileData()
  }, [])

  const getProfileData = async () => {
    const profileData = await getProfile()
    setProfile(profileData.data)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      setProfile({ ...profile, avatar: reader.result })
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await putProfile({ profile })
    getProfileData()
    setIsEditing(false)
  }

  const handleEditClick = (event) => {
    event.preventDefault()
    setIsEditing(true)
  }

  return (
    <div className="MyProfile">
      <Navbar />
      <div className="my-profile">
        <SidePage profileColor="#708FE0" border="1px solid #708FE0" />
        <div className="InputFields">
          <h1>Account Settings</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="image-container">
                <input
                  type="file"
                  id="image-input"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                />
                {profile.avatar ? (
                  <img src={profile.avatar} />
                ) : (
                  <label htmlFor="image-input">Choose Image</label>
                )}
              </div>
              <div className="edit-button">
                {!isEditing && (
                  <AccountButton
                    text="Edit Information"
                    onClick={handleEditClick}
                  />
                )}
              </div>
            </div>
            <div>
              <div className="input-field">
                <div className="input-field-title">Username</div>
                <input
                  name="username"
                  value={profile.username || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="input-field">
                <div className="input-field-title">Mobile number</div>
                <input
                  name="mobile"
                  value={profile.mobile || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            {isEditing && <button type="submit">Save Changes</button>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default MyProfile
