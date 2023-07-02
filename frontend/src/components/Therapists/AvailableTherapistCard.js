import React from 'react'
import AccountButton from '../Account/AccountButton'
import '../../styles/Therapists/AvailableTherapistsCard.css'

function AvailableTherapistCard() {

    const pickHandler = () => {
        // upon clicking, border of therapist card changes to green
    }

    return (
        <div className='available-therapist-card'>
            <div className='name-and-edit'>
                <div className='therapist-name'>Name</div>
                <AccountButton onClick={pickHandler} text='Pick'/>
            </div>
            <div>
                <div className='therapist-detail'>Contact Number</div>
                <div className='therapist-detail'>Email</div>
                <div className='therapist-detail'>Address</div>
            </div>
        </div>
      )
}

export default AvailableTherapistCard