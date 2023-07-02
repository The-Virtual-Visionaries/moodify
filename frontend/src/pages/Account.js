import React from 'react'
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
import MyProfile from './Patient/PatientAccount/MyProfile'

function Account() {
    const { role } = useAuth()

    if (role === "Patient") {
      return <MyProfile/>
    }
  
    return <Navigate to="/401" />
}

export default Account