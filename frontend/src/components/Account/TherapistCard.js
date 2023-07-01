import React from 'react'
import '../../styles/Account/TherapistCard.css'
import AccountButton from './AccountButton'

function TherapistCard() {
  return (
    <div className='therapist-card'>
        <div className='name-and-edit'>
            <div className='therapist-name'>Name</div>
            <AccountButton text='Delete'/>
        </div>
        <div>
            <div className='therapist-detail'>Contact Number</div>
            <div className='therapist-detail'>Email</div>
            <div className='therapist-detail'>Address</div>
        </div>
    </div>
  )
}

export default TherapistCard