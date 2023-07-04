import { NextFunction, Request, Response } from "express"
import { sign } from "jsonwebtoken"
import config from "../config"
import { RequestWithUser } from "../interfaces/user.interface"
import {
  Patient,
  PatientCreateType,
  PatientDbType,
} from "../models/patient.model"
import {
  Therapist,
  TherapistCreateType,
  TherapistDbType,
} from "../models/therapist.model"
import { RoleEnum, User, UserDbType } from "../models/user.model"

type UserGETResponseType = {
  email: string
  name: string
}

export class UserController {
  private filterResponseData(data: UserDbType): { id: string } {
    return { id: data.id }
  }

  private filterGETResponseData(data: UserDbType): UserGETResponseType {
    return { email: data.email, name: data.name }
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const findAllUsersData: UserDbType[] = await User.getAll()
    const filteredData = findAllUsersData.map(this.filterGETResponseData)
    res.status(200).json({ data: filteredData, message: "Found all users" })
  }

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.params.id
    const findOneUserData: UserDbType = await User.getByUUID(userId)
    const filteredData = this.filterGETResponseData(findOneUserData)
    res.status(200).json({ data: filteredData, message: "User found" })
  }

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    const userData: UserDbType = req.body
    const createUserData: UserDbType = await User.create(userData)
    if (userData.role === RoleEnum.therapist) {
      const therapistData: TherapistCreateType = {
        userId: createUserData.id,
      }
      await Therapist.create(therapistData)
    } else if (userData.role === RoleEnum.patient) {
      const patientData: PatientCreateType = {
        userId: createUserData.id,
      }
      await Patient.create(patientData)
    }
    const filteredData = this.filterResponseData(createUserData)
    res.status(200).json({ data: filteredData, message: "User created" })
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const user: UserDbType = await User.checkCredentials(email, password)
    if (!user) {
      return res.status(401).json("Invalid email or password")
    }

    const token = sign(
      {
        user: { _id: user._id, id: user.id },
      },
      config.SECRET_KEY,
      { expiresIn: config.TTL }
    )
    res
      .status(200)
      .json({ data: { token, role: user.role }, message: "Logged in" })
  }

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.params.id
    const userData: UserDbType = req.body
    const updateUserData: UserDbType = await User.updateByUUID(userId, userData)
    const filteredData = this.filterResponseData(updateUserData)
    res.status(200).json({ data: filteredData, message: "User updated" })
  }

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.params.id
    const deleteUserData: UserDbType = await User.deleteByUUID(userId)
    const filteredData = this.filterResponseData(deleteUserData)
    res.status(200).json({ data: filteredData, message: "User deleted" })
  }

  public getProfile = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.user.id
    const userData: UserDbType = await User.getByUUID(userId)
    if (userData.role === RoleEnum.patient) {
      const patientData: PatientDbType = await Patient.getByUserUUID(userId)
      const profileData = patientData.profile
      res
        .status(200)
        .json({ data: profileData, message: "Patient profile found" })
    } else if (userData.role === RoleEnum.therapist) {
      const therapistData: TherapistDbType = await Therapist.getByUserUUID(
        userId
      )
      const profileData = therapistData.profile
      res
        .status(200)
        .json({ data: profileData, message: "Therapist profile found" })
    }
  }

  public updateProfile = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.user.id
    const userData: UserDbType = await User.getByUUID(userId)
    if (userData.role === RoleEnum.patient) {
      const patientData: PatientDbType = req.body
      const updatePatientData: PatientDbType = await Patient.updateByUserUUID(
        userId,
        patientData
      )
      const newProfileData = updatePatientData.profile
      res.status(200).json({
        data: newProfileData,
        message: "Patient profile updated",
      })
    } else if (userData.role === RoleEnum.therapist) {
      const therapistData: TherapistDbType = req.body
      const updateTherapistData: TherapistDbType =
        await Therapist.updateByUserUUID(userId, therapistData)
      const newProfileData = updateTherapistData.profile
      res.status(200).json({
        data: newProfileData,
        message: "Therapist profile updated",
      })
    }
  }
}
