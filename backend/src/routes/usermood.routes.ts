import { authMiddleware } from "../middlewares/auth.middleware";

const express = require('express')
const Mood = require('../models/usermood.model')
const {
    getUsermoods,
    addUsermood,
    getStreak,
    checkMoodInputToday,
    dayUsermood
} = require('../controllers/usermood.controller')

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Usermoods route!")
  })

router.get("/get-usermoods", authMiddleware, getUsermoods)

router.get("/day-usermood", authMiddleware, dayUsermood)

// call moods ai api
router.post("/add-mood", authMiddleware, addUsermood)

router.get("/get-streak", authMiddleware, getStreak)

router.get("/check-mood-input-today", authMiddleware, checkMoodInputToday)

export default router;
