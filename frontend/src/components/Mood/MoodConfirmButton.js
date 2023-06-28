import React from 'react'
import { useNavigate } from "react-router-dom";
import '../../styles/Mood/MoodConfirmButton.css'

function MoodConfirmButton() {

    const navigate = useNavigate();
    const confirmButtonHandler = () => {
        navigate('/home');
    }

    return (
        <div>
            <button className='confirm-button' onClick={confirmButtonHandler}>Confirm</button>
        </div>
    )
}

export default MoodConfirmButton