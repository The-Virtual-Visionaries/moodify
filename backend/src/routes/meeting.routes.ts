import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requestHandler } from "../middlewares/requestHandler.middleware";

const {
    scheduleMeeting,
    getSortedUpcoming,
    listTherapists,
} = require('../controllers/meeting.controller')

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Meeting route!")
  }
)

router.post("/schedule-meeting", authMiddleware, requestHandler(scheduleMeeting))

router.get("/get-sorted-upcoming", authMiddleware, requestHandler(getSortedUpcoming))

router.get("/list-therapists", authMiddleware, requestHandler(listTherapists))

export default router;