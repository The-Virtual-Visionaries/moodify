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
