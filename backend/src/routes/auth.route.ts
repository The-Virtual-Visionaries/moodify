import { AuthController } from "../controllers/auth.controller"
import { Routes } from "../interfaces/routes.interface"
import { requestHandler } from "../middlewares/requestHandler.middleware"
import { Router } from "express"

export class AuthRoute implements Routes {
  public path = "/auth"
  public router = Router()
  public auth = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, requestHandler(this.auth.signup))
    this.router.post(`${this.path}/login`, requestHandler(this.auth.login))
  }
}
