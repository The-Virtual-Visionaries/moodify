import express, { Response }  from "express";
// import user from "./user.route";
import { UserRoute } from "./user.route"
import usermood from "./usermood.routes";

const router = express.Router();

const userRoute = new UserRoute()

router.get("/", (_, res: Response) => res.status(200).send('ok'));
router.use("/", userRoute.router)
router.use("/usermood", usermood);

export default router;