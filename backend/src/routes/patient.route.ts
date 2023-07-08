import { Router } from "express"
import { PatientController } from "../controllers/patient.controller"
import { Routes } from "../interfaces/routes.interface"
import { authMiddleware } from "../middlewares/auth.middleware"
import { requestHandler } from "../middlewares/requestHandler.middleware"

export class PatientRoute implements Routes {
  public path = "/patients"
  public router = Router()
  public patient = new PatientController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      requestHandler(this.patient.getPatient)
    )
    this.router.post(
      `${this.path}/assign`,
      authMiddleware,
      requestHandler(this.patient.assignTherapist)
    )
    this.router.post(
      `${this.path}/unassign`,
      authMiddleware,
      requestHandler(this.patient.unassignTherapist)
    )
  }
}
