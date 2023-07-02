import React from 'react'
import '../styles/Landingpage/Landingpage.css'
import { useNavigate } from "react-router-dom";
import LandingpageNavbar from '../components/Landingpage/LandingpageNavbar'
import LandingpageHeader from '../components/Landingpage/LandingpageHeader'
import LandingpageButton from '../components/Landingpage/LandingpageButton'

function Landingpage() {

  const navigate = useNavigate();
  const signupHandler = () => {
      navigate('/signup');
  }
  const loginHandler = () => {
    navigate('/login');
  }

  return (
    <div className='LandingPage'>
      <LandingpageNavbar/>
      <LandingpageHeader/>
      <div className='landing-buttons'>
        <LandingpageButton bgColour='#BDE3FF' borderCol='transparent' text='Sign Up' onClick={signupHandler}/>
        <LandingpageButton bgColour='transparent' borderCol='transparent' text='Login' onClick={loginHandler}/>
      </div>
    </div>
  )
}

export default Landingpage