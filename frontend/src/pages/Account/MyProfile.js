import React, { useEffect, useState } from "react";
import SidePage from "../../components/Account/SidePage";
import Navbar from "../../components/Navbar";
import TherapistNavbar from "../../components/TherapistNavbar";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/Account/MyProfile.css";
import { getProfile, putProfile } from "../../utils/private/invokeBackend";
import GenericButton from "../../components/Account/GenericButton";

function MyProfile() {
    const { role } = useAuth();
    const [profile, setProfile] = useState({
        username: "",
        avatar: "",
        mobile: "",
        address: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        getProfileData();
    }, []);

    const getProfileData = async () => {
        const profileData = await getProfile();
        setProfile(profileData.data);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setProfile({ ...profile, avatar: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (event) => {
        setProfile({ ...profile, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const phoneRegex = /^\d{8}$/;

        if (!phoneRegex.test(profile.mobile)) {
            alert("Invalid phone number");
            return;
        }

        await putProfile({ profile });
        getProfileData();
        setIsEditing(false);
    };

    const handleEditClick = (event) => {
        event.preventDefault();
        setIsEditing(true);
    };

    return (
        <div className="MyProfile">
            {role === "Patient" ? <Navbar /> : <TherapistNavbar />}
            <div className="my-profile">
                <SidePage profileColor="#708FE0" border="1px solid #708FE0" />
                <div className="InputFields">
                    <h1>Account Settings</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="image-container">
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="image-input"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={!isEditing}
                                />
                                <label htmlFor="image-input">
                                    {profile.avatar ? (
                                        <img src={profile.avatar} />
                                    ) : (
                                        "Choose Image"
                                    )}
                                </label>
                            </div>
                            <div className="edit-button">
                                {!isEditing && (
                                    <GenericButton
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
                                    style={{ border: isEditing ? "1px solid #003358" : "none" }}
                                />
                            </div>
                            <div className="input-field">
                                <div className="input-field-title">Mobile number</div>
                                <input
                                    name="mobile"
                                    value={profile.mobile || ""}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                    style={{ border: isEditing ? "1px solid #003358" : "none" }}
                                />
                            </div>
                            {role === "Therapist" && (
                                <div className="input-field">
                                    <div className="input-field-title">Address</div>
                                    <input
                                        name="address"
                                        value={profile.address || ""}
                                        onChange={handleInputChange}
                                        readOnly={!isEditing}
                                        style={{ border: isEditing ? "1px solid #003358" : "none" }}
                                    />
                                </div>
                            )}
                        </div>
                        {isEditing && <button type="submit">Save Changes</button>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
