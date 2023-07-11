import React, { useEffect, useState } from "react"
import "../../styles/Grateful/GratefulItem.css"
import {
  addGrateful,
  deleteGrateful,
  getGratefuls,
} from "../../utils/private/invokeBackend"

function GratefulItem() {
  const [gratefulItems, setGratefulItems] = useState([])

  useEffect(() => {
    getGratefulData()
  }, [])

  const getGratefulData = async () => {
    try {
      const gratefulData = await getGratefuls()
      setGratefulItems(gratefulData)
    } catch (error) {
      console.log("No grateful data found")
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value.trim()
      if (value !== "") {
        const timestamp = Date.now()
        const today = new Date(timestamp)
        // YYYY-MM-DD
        const todayDate =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate()
        const newItem = {
          date: todayDate,
          grateful: value,
        }
        setGratefulItems((prevItems) => [...prevItems, newItem])
        event.target.value = ""
        addGrateful({ grateful: value })
      }
    }
  }

  const handleDelete = async (id) => {
    try {
      const data = await deleteGrateful({ objectId: id })
      const newItems = gratefulItems.filter((item) => item._id !== id)
      setGratefulItems(newItems)
    } catch (error) {
      console.log(error.message)
    }
  }

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
          <div key={item._id} className="grateful-item">
            <div className="grateful-item-desc">
              <div className="grateful-date">{item.date}</div>
              <div className="grateful-text">{item.grateful}</div>
            </div>
            {/* button flush to right of container */}
            <button
              style={{
                backgroundColor: "#48B3FF",
                borderRadius: "50px",
                borderColor: "transparent",
                padding: "0.5vw",
                color: "white",
                width: "10vw",
                float: "right",
              }}
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GratefulItem
