import React from 'react'
import '../../styles/Mood/Mood_Notepad.css'

function Mood_Notepad() {
  return (
    <div className='Notepad'>
        <div class="mb-3 notepad">
            <textarea class="form-control" id="exampleFormControlTextarea1" placeholder="Pen down your thoughts..." rows='20'></textarea>
        </div>
    </div>
  )
}

export default Mood_Notepad