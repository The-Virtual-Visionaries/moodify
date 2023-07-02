import axios from "axios"
import { BACKEND_URI } from "../../config/env.config"

const token = localStorage.getItem("token")
let newToken

if (token) {
  newToken = token.substring(1, token.length - 1)
}

export const getUsers = async () => {
  const response = await axios.get(`${BACKEND_URI}/users`, {
    headers: {
      Authorization: `Bearer ${newToken}`,
    },
  })
  return response.data
}
