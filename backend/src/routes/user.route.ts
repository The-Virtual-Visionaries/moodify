import { Router } from "express"
import { UserController } from "../controllers/user.controller"
import { Routes } from "../interfaces/routes.interface"
import { authMiddleware } from "../middlewares/auth.middleware"
import { requestHandler } from "../middlewares/requestHandler.middleware"

export class UserRoute implements Routes {
  public path = "/users"
  public router = Router()
  public user = new UserController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, requestHandler(this.user.signup))
    this.router.post(`${this.path}/login`, requestHandler(this.user.login))
    this.router.get(
      `${this.path}`,
      authMiddleware,
      requestHandler(this.user.getUsers)
    )
    this.router.get(
      `${this.path}/profile`,
      authMiddleware,
      requestHandler(this.user.getProfile)
    )
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      requestHandler(this.user.getUserById)
    )
    this.router.put(
      `${this.path}/profile`,
      authMiddleware,
      requestHandler(this.user.updateProfile)
    )
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      requestHandler(this.user.updateUser)
    )
  }
}
