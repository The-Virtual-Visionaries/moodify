import { NextFunction, Request, Response } from "express"
import { RoleEnum, User, UserDbType } from "../models/user.model"
import { Therapist, TherapistCreateType } from "../models/therapist.model"
import { Patient, PatientCreateType } from "../models/patient.model"
import config from "../config"
import { sign } from "jsonwebtoken"

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
}
