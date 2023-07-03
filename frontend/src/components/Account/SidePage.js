import React from 'react'
import '../../styles/Account/SidePage.css'
import AccountButton from './AccountButton'

function SidePage(props) {
  return (
    <div className='SidePage'>
        <a href="/account" style={{color: props.profileColor, borderBottom: props.border}}>My Profile</a>
        <a href="/user-contact" style={{color: props.contactColor, borderBottom: props.contactBorder}}>Therapists and Emergency Contact</a>
        <div className='reset-button'><AccountButton text='Reset Password'/></div>
    </div>
  )
}

export default SidePage