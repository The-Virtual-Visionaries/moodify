import React from 'react'
import '../../styles/Landingpage/LandingpageButton.css'

function LandingpageButton(props) {
  return (
    <div className='LandingpageButton'>
        <button className='landing-button' style={{backgroundColor: props.bgColour, borderColor: props.borderCol}}>{props.text}</button>
    </div>
  )
}

export default LandingpageButton