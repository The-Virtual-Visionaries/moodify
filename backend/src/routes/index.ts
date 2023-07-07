import express, { Response } from "express"
import grateful from "./grateful.routes"
import meeting from "./meeting.routes"
import { TherapistRoute } from "./therapist.route"
import { UserRoute } from "./user.route"
import { PatientRoute } from "./patient.route"
import usermood from "./usermood.routes"

const router = express.Router()

const userRoute = new UserRoute()
const therapistRoute = new TherapistRoute()
const patientRoute = new PatientRoute()

router.get("/", (_, res: Response) => res.status(200).send("ok"))
router.use("/", userRoute.router)
router.use("/", therapistRoute.router)
router.use("/", patientRoute.router)
router.use("/usermood", usermood)
router.use("/grateful", grateful)
router.use("/meeting", meeting)

export default router
