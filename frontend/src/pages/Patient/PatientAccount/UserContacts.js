import React from 'react'
import Navbar from '../../../components/Navbar'
import SidePage from '../../../components/Account/SidePage'
import TherapistCard from '../../../components/Account/TherapistCard'
import EmergencyContactCard from '../../../components/Account/EmergencyContactCard'
import '../../../styles/Account/UserContacts.css'
import AddButton from '../../../components/Account/AddButton'
import { useNavigate } from "react-router-dom";

function UserContacts() {

  const navigate = useNavigate()

  const therapistHandler = () => {
    navigate('/therapists')
  }

  return (
    <div className='UserContacts'>
      <Navbar/>
      <div className='user-contacts'>
        <SidePage contactColor='#708FE0' contactBorder='1px solid #708FE0'/>
        <div className='contacts'>
          <h1>Contact Settings</h1>
          <div className='User-Therapists'>
            <div className='header-and-add'>
              <h3>My Therapist</h3>
              <AddButton onClick={therapistHandler}/>
            </div>
            <TherapistCard/>
          </div>
          <div className='EmergencyContact'>
            <div className='header-and-add'>
              <h3>My Emergency Contact</h3>
              <AddButton/>
            </div>
            <EmergencyContactCard/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserContacts