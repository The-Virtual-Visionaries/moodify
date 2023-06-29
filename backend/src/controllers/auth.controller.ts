import config from "../config"
import { User, UserDbType } from "../models/user.model"
import { NextFunction, Request, Response } from "express"
import { sign } from "jsonwebtoken"

export class AuthController {
  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const user = await User.checkCredentials(email, password)
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
    res.status(200).json({ data: { token }, message: "Logged in" })
  }

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    const userData: UserDbType = req.body
    await User.create(userData)
    res.status(200).json({ message: "Successfully registered" })
  }
}
