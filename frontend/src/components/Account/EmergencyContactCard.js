import React from 'react'
import '../../styles/Account/EmergencyContactCard.css'
import AccountButton from './AccountButton'

function EmergencyContactCard() {
  return (
    <div className='emergency-contact-card'>
        <div className='name-and-edit'>
            <div className='emergency-contact-name'>Name</div>
            <button 
              style={{
                backgroundColor:'#48B3FF', 
                borderRadius:'50px', 
                borderColor:'transparent', 
                padding:'0.5vw', 
                color:'white',
                width:'10vw'}}
                data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
        </div>
        <div>
            <div className='emergency-detail'>Contact Number</div>
            <div className='emergency-detail'>Email</div>
        </div>
    </div>
  )
}

export default EmergencyContactCard