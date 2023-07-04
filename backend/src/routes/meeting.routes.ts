import express from "express";

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

router.post("/schedule-meeting", scheduleMeeting)

router.get("/get-sorted-upcoming", getSortedUpcoming)

router.get("/list-therapists", listTherapists)

export default router;