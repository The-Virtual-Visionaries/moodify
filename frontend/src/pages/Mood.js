import React from 'react'
import Navbar from '../components/Navbar'
import Mood_Header from '../components/Mood/Mood_Header'
import Mood_Button from '../components/Mood/Mood_Button'
import '../styles/Mood/Mood.css'
import { useState } from 'react'
import MoodConfirmButton from '../components/Mood/MoodConfirmButton'

function Mood() {

  const [selectedMood, setSelectedMood] = useState(null);
  const moodButtonHandler = (mood) => {
    setSelectedMood(mood);
  }

  return (
    <div className='Mood'>
        <Navbar/>
        <Mood_Header/>
        <div className='mood-buttons'>
            <Mood_Button mood='HAPPY' isSelected={selectedMood == 'HAPPY'} onClick={() => moodButtonHandler('HAPPY')}/>
            <Mood_Button mood='EXCITED' isSelected={selectedMood == 'EXCITED'} onClick={() => moodButtonHandler('EXCITED')}/>
            <Mood_Button mood='SAD' isSelected={selectedMood == 'SAD'} onClick={() => moodButtonHandler('SAD')}/>
            <Mood_Button mood='DISAPPOINTED' isSelected={selectedMood == 'DISAPPOINTED'} onClick={() => moodButtonHandler('DISAPPOINTED')}/>
            <Mood_Button mood='OKAY' isSelected={selectedMood == 'OKAY'} onClick={() => moodButtonHandler('OKAY')}/>
            <Mood_Button mood='GRATEFUL' isSelected={selectedMood == 'GRATEFUL'} onClick={() => moodButtonHandler('GRATEFUL')}/>
            <Mood_Button mood='ANGRY' isSelected={selectedMood == 'ANGRY'} onClick={() => moodButtonHandler('ANGRY')}/>
            <Mood_Button mood='LONELY' isSelected={selectedMood == 'LONELY'} onClick={() => moodButtonHandler('LONELY')}/>
            <Mood_Button mood='HOPEFUL' isSelected={selectedMood == 'HOPEFUL'} onClick={() => moodButtonHandler('HOPEFUL')}/>
            <Mood_Button mood='ANXIOUS' isSelected={selectedMood == 'ANXIOUS'} onClick={() => moodButtonHandler('ANXIOUS')}/>
            <Mood_Button mood='RELAXED' isSelected={selectedMood == 'RELAXED'} onClick={() => moodButtonHandler('RELAXED')}/>
        </div>
        <MoodConfirmButton/>
    </div>
  )
}

export default Mood