import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

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

router.post("/schedule-meeting", authMiddleware, scheduleMeeting)

router.get("/get-sorted-upcoming", authMiddleware, getSortedUpcoming)

router.get("/list-therapists", authMiddleware, listTherapists)

export default router;