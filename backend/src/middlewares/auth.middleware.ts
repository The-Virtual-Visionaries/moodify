import config from "../config"
import { User } from "../models/user.model"
import passport, { PassportStatic } from "passport"
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptions,
} from "passport-jwt"

var opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.SECRET_KEY,
}

const strategy = new JwtStrategy(opts, function (jwt_payload, done) {
  User.getByUUID(jwt_payload.user.id)
    .then((user) => {
      if (user) {
        return done(null, { _id: user._id, id: user.id })
      } else {
        return done(null, false, { message: "User not found" })
      }
    })
    .catch((err) => {
      return done(err, false)
    })
})

export const configurePassport = (passport: PassportStatic) => {
  passport.use(strategy)
}

export const authMiddleware = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message })
    }
    if (!user) {
      return res.status(401).json({ message: info.message })
    }
    req.user = user
    next()
  })(req, res, next)
}
