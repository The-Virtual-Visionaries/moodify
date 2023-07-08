import React from "react"

function GenericButton(props) {
  return (
    <div>
      <button
        style={{
          backgroundColor: "#48B3FF",
          borderRadius: "50px",
          borderColor: "transparent",
          padding: "0.5vw",
          color: "white",
          width: "10vw",
        }}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  )
}

export default GenericButton
