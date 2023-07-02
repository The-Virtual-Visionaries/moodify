const express = require('express')
const Mood = require('../models/usermood.model')
const {
    getUsermoods,
    addUsermood,
    getStreak,
    checkMoodInputToday
} = require('../controllers/usermood.controller')

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Usermoods route!")
  })

  router.get("/test/:pid", (req, res) => {
    const {pid} = req.params
    res.send(pid)
  })

router.get("/get-usermoods/:pid", getUsermoods)

router.post("/add-mood", addUsermood)

router.get("/get-streak/:pid", getStreak)

router.get("/check-mood-input-today/:pid", checkMoodInputToday)

export default router;
