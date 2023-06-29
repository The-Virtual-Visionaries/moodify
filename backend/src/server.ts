import express from "express"
import cors from "cors"
import helmet from "helmet"
import hpp from "hpp"
import compression from "compression"
import cookieParser from "cookie-parser"
import config from "./config"
import mongoose from "mongoose"
import { UserRoute } from "./routes/user.route"
import { AuthRoute } from "./routes/auth.route"
import { configurePassport } from "./middlewares/auth.middleware"
import passport from "passport"

const app = express()

const authRoute = new AuthRoute()
const userRoute = new UserRoute()

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

app.use("/", userRoute.router)
app.use("/", authRoute.router)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`)
})
