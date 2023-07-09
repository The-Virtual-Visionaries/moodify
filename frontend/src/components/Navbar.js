import React, { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";
import { getStreak } from "../utils/private/invokeBackend";

function Navbar(props) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function fetchStreak() {
      try {
        const currentStreak = await getStreak();
        if (currentStreak === -1) {
          return;
        }
        setStreak(currentStreak);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStreak();
  }, [props.inputToday]);

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
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/consult"
                style={{ color: "black" }}
              >
                Consult
              </a>
            </li>
          </ul>
        </div>
        <div style={{ marginRight: "1vw" }}>Mood Streak: {streak}</div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
