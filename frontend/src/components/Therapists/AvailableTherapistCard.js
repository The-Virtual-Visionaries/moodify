import React, { useState } from 'react'
import '../../styles/Therapists/AvailableTherapistsCard.css'

function AvailableTherapistCard({styles, isPicked, onClick}) {

    const cardStyle = {
        ...styles,
        border: isPicked ? '2px solid #55B6B0' : '1px solid #48B3FF',
    };

    return (
        <div className='available-therapist-card' style={cardStyle} onClick={onClick}>
            <div className='name-and-edit'>
                <div className='therapist-name'>Name</div>
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