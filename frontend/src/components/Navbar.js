import React from "react";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#BDE3FF" }}
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
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="/" 
                style={{ color: "black" }}
              >
                Account
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/"
                style={{ color: "black" }}
              >
                Resources
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
