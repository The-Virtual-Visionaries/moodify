import compression from "compression"
import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import helmet from "helmet"
import hpp from "hpp"
import mongoose from "mongoose"
import passport from "passport"
import config from "./src/config"
import { configurePassport } from "./src/middlewares/auth.middleware"
import router from "./src/routes"

const app = express()

mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err))

app.use(cors())
app.use(hpp())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(passport.initialize())
configurePassport(passport)
app.use(router)

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`)
})
