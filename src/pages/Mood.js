import React from 'react'
import Navbar from '../components/Navbar'
import Mood_Header from '../components/Mood/Mood_Header'
import Mood_Button from '../components/Mood/Mood_Button'
import '../styles/Mood/Mood.css'

function Mood() {
  return (
    <>
        <Navbar/>
        <Mood_Header/>
        <div className='mood-buttons'>
            <Mood_Button mood='Happy'/>
            <Mood_Button mood='Sad'/>
        </div>
    </>
  )
}

export default Mood