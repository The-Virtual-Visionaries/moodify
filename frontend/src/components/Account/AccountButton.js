import React from "react";
import { addUsermood } from "../../utils/private/invokeBackend";

function AccountButton(props) {
  const handleSubmit = () => {
    addUsermood({ entry: props.entry });
  };

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
        onClick={handleSubmit}
      >
        {props.text}
      </button>
    </div>
  );
}

export default AccountButton;
