import { NextFunction, Request, Response } from "express"
import { User, UserDbType } from "../models/user.model"

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

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: UserDbType = req.body
    const createUserData: UserDbType = await User.create(userData)
    const filteredData = this.filterResponseData(createUserData)
    res.status(200).json({ data: filteredData, message: "User created" })
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
