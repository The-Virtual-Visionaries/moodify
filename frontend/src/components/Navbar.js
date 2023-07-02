import React from "react";
import LogoutButton from "./LogoutButton";

function Navbar() {
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
                href="/therapists"
                style={{ color: "black" }}
              >
                Therapists
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
        <div>
          <LogoutButton/>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
