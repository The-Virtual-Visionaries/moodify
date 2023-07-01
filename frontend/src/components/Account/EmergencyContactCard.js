import React from 'react'
import '../../styles/Account/EmergencyContactCard.css'
import AccountButton from './AccountButton'

function EmergencyContactCard() {
  return (
    <div className='emergency-contact-card'>
        <div className='name-and-edit'>
            <div className='emergency-contact-name'>Name</div>
            <AccountButton text='Edit'/>
        </div>
        <div>
            <div className='emergency-detail'>Contact Number</div>
            <div className='emergency-detail'>Email</div>
        </div>
    </div>
  )
}

export default EmergencyContactCard