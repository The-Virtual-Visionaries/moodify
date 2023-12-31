import { authMiddleware } from "../middlewares/auth.middleware"

const express = require("express")
const {
  getGratefuls,
  addGrateful,
  deleteGrateful,
} = require("../controllers/grateful.controller")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("Grateful route!")
})

router.get("/get-gratefuls", authMiddleware, getGratefuls)

router.post("/add-grateful", authMiddleware, addGrateful)

router.delete("/delete-grateful", authMiddleware, deleteGrateful)

export default router
