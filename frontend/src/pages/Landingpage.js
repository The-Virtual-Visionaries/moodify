import React from 'react'
import '../styles/Landingpage/Landingpage.css'
import LandingpageNavbar from '../components/Landingpage/LandingpageNavbar'
import LandingpageHeader from '../components/Landingpage/LandingpageHeader'
import LandingpageButton from '../components/Landingpage/LandingpageButton'

function Landingpage() {
  return (
    <div className='LandingPage'>
      <LandingpageNavbar/>
      <LandingpageHeader/>
      <div className='landing-buttons'>
        <LandingpageButton bgColour='#BDE3FF' borderCol='transparent' text='Sign Up'/>
        <LandingpageButton bgColour='transparent' borderCol='transparent' text='Login'/>
      </div>
    </div>
  )
}

export default Landingpage