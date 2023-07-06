import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import SidePage from '../../../components/Account/SidePage'
import TherapistCard from '../../../components/Account/TherapistCard'
import EmergencyContactCard from '../../../components/Account/EmergencyContactCard'
import '../../../styles/Account/UserContacts.css'
import AddButton from '../../../components/Account/AddButton'
import AvailableTherapistCard from '../../../components/Therapists/AvailableTherapistCard'
import { useNavigate } from "react-router-dom";

function UserContacts() {

  const navigate = useNavigate()

  const therapistHandler = () => {
    navigate('/therapists')
  }

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };

  const availableTherapists = [
    { name: 'Therapist 1', contactNumber: '123456789', email: 'therapist1@example.com', address: '123 Street' },
    { name: 'Therapist 2', contactNumber: '987654321', email: 'therapist2@example.com', address: '456 Avenue' },
  ];


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
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#therapistModal" data-bs-whatever="@mdo" style={{
                padding: '2vh',
                backgroundColor: '#55B6B0', 
                color: 'white',
                fontSize: '2vw',
                width: '50px',
                height: '50px',
                borderRadius:'50%',
                border: 'none',
                textAlign: 'center',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}>+</button>
                <div class="modal fade" id="therapistModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Pick your therapist</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {availableTherapists.map((therapist, index) => (
                          <AvailableTherapistCard
                            key={index}
                            styles={{ color: 'black', fontSize: '16px' }}
                            isPicked={selectedCardIndex === index}
                            onClick={() => handleCardClick(index)}
                          />
                        ))}
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style={{borderRadius: '50px'}}>Close</button>
                        <button type="button" class="btn btn-primary" style={{
                          backgroundColor:'#48B3FF', 
                          borderRadius:'50px', 
                          borderColor:'transparent', 
                          padding:'0.5vw', 
                          color:'white',
                          width:'10vw'}} data-bs-dismiss="modal" aria-label="Close">Pick</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <TherapistCard/>
          </div>
          <div className='EmergencyContact'>
            <div className='header-and-add'>
              <h3>My Emergency Contact</h3>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" style={{
                padding: '2vh',
                backgroundColor: '#55B6B0', 
                color: 'white',
                fontSize: '2vw',
                width: '50px',
                height: '50px',
                borderRadius:'50%',
                border: 'none',
                textAlign: 'center',
                boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}>+</button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Emergency Contact Details</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <form>
                        <div class="mb-3">
                          <label for="recipient-name" class="col-form-label">Name:</label>
                          <input type="text" class="form-control" id="name"></input>
                        </div>
                        <div class="mb-3">
                          <label for="message-text" class="col-form-label">Mobile Number:</label>
                          <input type="text" class="form-control" id="name"></input>
                        </div>
                        <div class="mb-3">
                          <label for="message-text" class="col-form-label">Email:</label>
                          <input type="text" class="form-control" id="name"></input>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style={{borderRadius: '50px'}}>Close</button>
                      <button type="button" class="btn btn-primary" style={{
                        backgroundColor:'#48B3FF', 
                        borderRadius:'50px', 
                        borderColor:'transparent', 
                        padding:'0.5vw', 
                        color:'white',
                        width:'10vw'}}>Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <EmergencyContactCard/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserContacts