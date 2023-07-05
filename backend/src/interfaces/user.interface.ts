import { Request } from "express"
import { Types } from "mongoose"

interface UserJWT {
  _id: Types.ObjectId
  id: string
}

export interface RequestWithUser extends Request {
  user: UserJWT
}

export interface PatientProfile {
  username: string
  avatar: string
  mobile: string
}

export interface TherapistProfile {
  username: string
  avatar: string
  mobile: string
  address: string
}
