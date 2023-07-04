import express, { Response }  from "express";
// import user from "./user.route";
import { UserRoute } from "./user.route"
import usermood from "./usermood.routes";
import grateful from "./grateful.routes";
import meeting from "./meeting.routes";

const router = express.Router();

const userRoute = new UserRoute()

router.get("/", (_, res: Response) => res.status(200).send('ok'));
router.use("/", userRoute.router)
router.use("/usermood", usermood);
router.use("/grateful", grateful)
router.use("/meeting", meeting)

export default router;