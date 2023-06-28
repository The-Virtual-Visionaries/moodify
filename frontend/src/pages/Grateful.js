import React from 'react'
import Navbar from '../components/Navbar'
import GratefulHeader from '../components/Grateful/GratefulHeader'
import GratefulItem from '../components/Grateful/GratefulItem'
import '../styles/Grateful/Grateful.css'

function Grateful() {
  return (
    <div className='Grateful'>
      <Navbar/>
      <GratefulHeader/>
      <GratefulItem/>
    </div>
  )
}

export default Grateful