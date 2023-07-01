import React from 'react'
import '../../styles/Account/SidePage.css'
import AccountButton from './AccountButton'

function SidePage() {
  return (
    <div className='SidePage'>
        <a href="/account">My Profile</a>
        <a href="/user-contact">Therapists and Emergency Contact</a>
        <div className='reset-button'><AccountButton text='Reset Password'/></div>
    </div>
  )
}

export default SidePage