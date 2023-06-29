import dotenv from "dotenv"
import joi from "joi"

dotenv.config()

interface ConfigType {
  PORT: string
  MONGO_URI: string
  SECRET_KEY: string
  TTL: number
}

const ConfigSchema = joi.object({
  PORT: joi.number().default(5000),
  MONGO_URI: joi.string().required(),
  SECRET_KEY: joi.string().required(),
  TTL: joi.number().required(),
})

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  TTL: process.env.TTL,
}

const { error, value } = ConfigSchema.validate(config, {
  abortEarly: false,
}) as { error: joi.ValidationError | undefined; value: ConfigType }

if (error) {
  console.error(`Invalid configuration: ${error.message}`)
  process.exit(1)
}

export default value
