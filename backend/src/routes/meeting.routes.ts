import express from "express";

const {
    scheduleMeeting,
    getSortedUpcoming,
} = require('../controllers/meeting.controller')

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Meeting route!")
  }
)

router.post("/schedule-meeting", scheduleMeeting)

router.get("/get-sorted-upcoming", getSortedUpcoming)

export default router;