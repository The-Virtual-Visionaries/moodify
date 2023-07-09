import { addUsermood } from "../../utils/private/invokeBackend";
import React, { useState } from "react";

function AccountButton(props) {
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit() {
    setIsLoading(true);
    const data = await addUsermood({ entry: props.entry });
    setIsLoading(false);
    props.setInputToday(true);
    alert(data.message + ". Seems like you are feeling " + data.mood + ".");
  }

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
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : props.text}
      </button>
    </div>
  );
}

export default AccountButton;
