import { Router } from "express"
import { TherapistController } from "../controllers/therapist.controller"
import { Routes } from "../interfaces/routes.interface"
import { authMiddleware } from "../middlewares/auth.middleware"
import { requestHandler } from "../middlewares/requestHandler.middleware"

export class TherapistRoute implements Routes {
  public path = "/therapists"
  public router = Router()
  public therapist = new TherapistController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      requestHandler(this.therapist.getTherapists)
    )
    this.router.get(
      `${this.path}/:id`,
      authMiddleware,
      requestHandler(this.therapist.getTherapistById)
    )
  }
}
