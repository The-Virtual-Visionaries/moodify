import React from "react"
import { useAuth } from "../../hooks/useAuth"
import "../../styles/Account/SidePage.css"

function SidePage(props) {
  const { role } = useAuth()
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
  )
}

export default SidePage
