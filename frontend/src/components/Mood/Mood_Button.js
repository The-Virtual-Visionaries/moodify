import React from 'react'
import '../../styles/Mood/Mood_Button.css'

function Mood_Button(props) {
  return (
    <div>
        <button className={`mood-button ${props.isSelected ? 'selected' : ''}`} onClick={props.onClick}>{props.mood}</button>
    </div>
  )
}

export default Mood_Button