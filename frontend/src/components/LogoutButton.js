import React from 'react'
import { useNavigate } from 'react-router-dom'

function LogoutButton() {

    const navigate = useNavigate()
    const logoutHandler = () => {
        navigate('/')
    }

    return (
        <div>
            <button onClick={logoutHandler} style={{backgroundColor: 'transparent', borderColor:'#003358', borderRadius:'50px', paddingLeft:'1vw', paddingRight:'1vw', paddingTop:'0.3vw', paddingBottom:'0.3vw'}}>
                Logout
            </button>
        </div>
    )
}

export default LogoutButton