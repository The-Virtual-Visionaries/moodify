import React from 'react'
import Navbar from '../../../components/Navbar'
import SidePage from '../../../components/Account/SidePage'
import TherapistCard from '../../../components/Account/TherapistCard'
import EmergencyContactCard from '../../../components/Account/EmergencyContactCard'
import '../../../styles/Account/UserContacts.css'

function UserContacts() {
  return (
    <div className='UserContacts'>
      <Navbar/>
      <div className='user-contacts'>
        <SidePage/>
        <div className='contacts'>
          <h1>Contact Settings</h1>
          <div className='Therapists'>
            <h3>My Therapist</h3>
            <TherapistCard/>
          </div>
          <div className='EmergencyContact'>
          <h3>My Emergency Contact</h3>
            <EmergencyContactCard/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserContacts