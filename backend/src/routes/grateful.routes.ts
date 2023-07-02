const express = require('express')
const {
    getGratefuls,
    addGrateful,
} = require('../controllers/grateful.controller')

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Grateful route!")
  })

router.get("/get-gratefuls/:pid", getGratefuls)

router.post("/add-grateful", addGrateful)

export default router;
