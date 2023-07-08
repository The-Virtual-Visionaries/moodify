import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import inbox from "../assets/inbox.svg";
import "../styles/Navbar.css";

function TherapistNavbar() {
    const [notification, setNotificationClicked] = useState(false);

    function toggleNotifications() {
        setNotificationClicked(!notification);
        console.log(notification);
    }

    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{ backgroundColor: "#E4F2FF" }}
        >
            <div className="container-fluid">
                <a className="navbar-brand" href="/home">
                    <img
                        src={require("../assets/moodify-logo-black.png")}
                        alt="logo"
                        width="50"
                        className="tplogo"
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/account"
                                style={{ color: "black" }}
                            >
                                Account
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/resources"
                                style={{ color: "black" }}
                            >
                                Resources
                            </a>
                        </li>
                    </ul>
                </div>
                <a onClick={toggleNotifications}>
                    <img src={inbox} alt="inbox" style={{ height: "30px", width: "30px", marginRight: "1vh", cursor: "pointer" }} />
                </a>
                {notification && (
                    <div className="overlay">
                        <button className="close-button" onClick={toggleNotifications}>X</button>
                        <div className="overlay-content">
                            <div className="scrollable-content">
                                <h2>Your patient Kavan is feeling down</h2>
                                <h3>Check in with him!</h3>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <LogoutButton />
                </div>
            </div>
        </nav>
    );
}

export default TherapistNavbar;
