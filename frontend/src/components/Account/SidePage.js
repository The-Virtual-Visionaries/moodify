import React from "react";
import "../../styles/Account/SidePage.css";
import { useAuth } from "../../hooks/useAuth";

function SidePage(props) {
  const { role } = useAuth();
  return (
    <div className="SidePage">
      <a
        href="/account"
        style={{ color: props.profileColor, borderBottom: props.border }}
      >
        My Profile
      </a>
      {role === "Patient" ? (
        <a
          href="/user-contact"
          style={{
            color: props.contactColor,
            borderBottom: props.contactBorder,
          }}
        >
          Therapists and Emergency Contact
        </a>
      ) : null}
    </div>
  );
}

export default SidePage;
