import axios from "axios"
import { BACKEND_URI } from "../../config/env.config"

const authData = JSON.parse(localStorage.getItem("authData"))
let token

if (authData && authData.token) {
  token = authData.token
}

export const getProfile = async () => {
  const response = await axios.get(`${BACKEND_URI}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const putProfile = async (data) => {
  const response = await axios.put(`${BACKEND_URI}/users/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getPatient = async () => {
  const response = await axios.get(`${BACKEND_URI}/patients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getTherapists = async () => {
  const response = await axios.get(`${BACKEND_URI}/therapists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const assignTherapist = async (data) => {
  const response = await axios.post(`${BACKEND_URI}/patients/assign`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const unassignTherapist = async (data) => {
  const response = await axios.post(`${BACKEND_URI}/patients/unassign`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const putEmergencyContact = async (data) => {
  const response = await axios.put(`${BACKEND_URI}/patients/emergency`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
