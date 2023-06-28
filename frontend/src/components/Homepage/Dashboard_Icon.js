import React from 'react'
import '../../styles/Homepage/Dashboard_Icon.css'

function Dashboard_Icon(props) {
  const backgroundImageStyle = {
    backgroundImage: `url(${require('../../assets/pink-waves.svg').default})`,
  };

  return (
    <div className='Dashboard_Icon' onClick={props.onClick}>
        <button type='button' className='transparent-button' style={backgroundImageStyle}>{props.text}</button>
    </div>
  )
}

export default Dashboard_Icon