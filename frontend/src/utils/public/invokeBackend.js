import axios from "axios"
import { BACKEND_URI } from "../../config/env.config"

export const signupUser = async (user) => {
  try {
    const response = await axios.post(`${BACKEND_URI}/users/signup`, user)
    return response.data
  } catch (error) {
    throw error
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BACKEND_URI}/users/login`, credentials)
    return response.data
  } catch (error) {
    throw error
  }
}
