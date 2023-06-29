import express, { Response }  from "express";

const router = express.Router();

router.get("/", (_, res: Response) => res.status(200).send('ok'));

export default router;