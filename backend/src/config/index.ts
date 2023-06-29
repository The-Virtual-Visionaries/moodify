import dotenv from "dotenv"
import joi from "joi"

dotenv.config()

interface ConfigType {
  PORT: string
  MONGO_URI: string
}

const ConfigSchema = joi.object({
  PORT: joi.number().default(5000),
  MONGO_URI: joi.string().required(),
})

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
}

const { error, value } = ConfigSchema.validate(config, {
  abortEarly: false,
}) as { error: joi.ValidationError | undefined; value: ConfigType }

if (error) {
  console.error(`Invalid configuration: ${error.message}`)
  process.exit(1)
}

export default value
