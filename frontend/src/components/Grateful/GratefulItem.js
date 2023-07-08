import React from "react";
import { useState, useEffect } from "react";
import "../../styles/Grateful/GratefulItem.css";
import { addGrateful, getGratefuls } from "../../utils/private/invokeBackend";

function GratefulItem() {
  const [gratefulItems, setGratefulItems] = useState([]);

  useEffect(() => {
    getGratefulData();
  }, []);

  const getGratefulData = async () => {
    const gratefulData = await getGratefuls();
    console.log(gratefulData);
    setGratefulItems(gratefulData);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value.trim();
      if (value !== "") {
        const timestamp = Date.now();
        const today = new Date(timestamp);
        // YYYY-MM-DD
        const todayDate =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const newItem = {
          date: todayDate,
          grateful: value,
        };
        setGratefulItems((prevItems) => [...prevItems, newItem]);
        event.target.value = "";
        addGrateful({ grateful: value });
      }
    }
  };

  return (
    <div className="Grateful-Item">
      <input
        className="form-control form-control-lg add-item"
        type="text"
        placeholder="Add something you are grateful for..."
        aria-label=".form-control-lg example"
        onKeyDown={handleKeyPress}
      ></input>
      <div>
        {gratefulItems.map((item) => (
          <div key={item.id} className="grateful-item">
            {item.date}-------{item.grateful}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GratefulItem;
