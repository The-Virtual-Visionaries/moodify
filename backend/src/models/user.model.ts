import { compare, hash } from "bcrypt"
import { Document, Model, Schema, Types, model } from "mongoose"
import { generateString } from "../utils/generateRandom"
import { HttpException } from "../exceptions/httpException"

export enum RoleEnum {
  therapist = "Therapist",
  patient = "Patient",
}

interface UserDbType extends Document {
  _id: Types.ObjectId
  id: string
  name: string
  email: string
  password: string
  role: RoleEnum
}

interface UserCreateType {
  name: string
  email: string
  password: string
  role: RoleEnum
}

class User {
  private static Schema: Schema = new Schema({
    id: {
      type: String,
      unique: true,
      required: true,
      default: () => generateString(10),
    },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(RoleEnum), required: true },
  })

  private static Model: Model<UserDbType> = model<UserDbType>(
    "User",
    User.Schema,
    "Users"
  )

  public static create = async (user: UserCreateType): Promise<UserDbType> => {
    if (!user) throw new HttpException(500, "Validation error")
    const findUser: UserDbType = await User.getByEmail(user.email)
    if (findUser)
      throw new HttpException(409, `This email ${user.email} already exists`)

    const hashedPassword = await hash(user.password, 10)
    user.password = hashedPassword

    const newUser = await User.Model.create(user)
    if (!newUser) throw new HttpException(500, "User creation unsuccessful")
    return newUser.toObject({ getters: true }) as UserDbType
  }

  public static getById = async (
    id: Types.ObjectId
  ): Promise<UserDbType | null> => {
    if (!id) throw new HttpException(500, "Validation error")
    const user: UserDbType = await User.Model.findOne({
      _id: id,
    })
      .lean<UserDbType>()
      .exec()
    if (!user) {
      throw new HttpException(404, "User not found")
    }
    return user
  }

  public static getAll = async (): Promise<UserDbType[]> => {
    return User.Model.find().lean<UserDbType[]>().exec()
  }

  public static getByUUID = async (
    uuid: string
  ): Promise<UserDbType | null> => {
    if (!uuid) throw new HttpException(500, "Validation error")
    const user: UserDbType = await User.Model.findOne({
      id: uuid,
    })
      .lean<UserDbType>()
      .exec()
    if (!user) {
      throw new HttpException(404, "User not found")
    }
    return user
  }

  public static getByEmail = async (
    email: string
  ): Promise<UserDbType | null> => {
    if (!email) throw new HttpException(500, "Validation error")
    const user: UserDbType = await User.Model.findOne({
      email: email,
    })
      .lean<UserDbType>()
      .exec()
    return user
  }

  public static checkCredentials = async (
    email: string,
    password: string
  ): Promise<UserDbType | null> => {
    if (!email || !password) throw new HttpException(500, "Validation error")
    const user: UserDbType = await User.Model.findOne({
      email: email,
    })
      .lean<UserDbType>()
      .exec()
    if (!user) {
      throw new HttpException(401, "Invalid email or password")
    }
    const isPasswordMatch = await compare(password, user.password)
    if (!isPasswordMatch)
      throw new HttpException(401, "Invalid email or password")

    return user
  }

  public static updateByUUID = async (
    uuid: string,
    user: UserDbType
  ): Promise<UserDbType | null> => {
    if (!uuid || !user) throw new HttpException(500, "Validation error")
    const existingUser: UserDbType = await User.getByUUID(uuid)
    if (!existingUser) throw new HttpException(404, "User doesn't exist")

    if (user.email && user.email !== existingUser.email) {
      const findUser: UserDbType = await User.getByEmail(user.email)
      if (findUser)
        throw new HttpException(409, `This email ${user.email} already exists`)
    }

    if (user.password) {
      const hashedPassword = await hash(user.password, 10)
      user.password = hashedPassword
    }

    const updateUserData: UserDbType = await User.Model.findOneAndUpdate(
      { id: uuid },
      user,
      { new: true }
    )
      .lean<UserDbType>()
      .exec()

    if (!updateUserData) {
      throw new HttpException(404, "User not found")
    }

    return updateUserData
  }

  public static deleteByUUID = async (
    uuid: string
  ): Promise<UserDbType | null> => {
    if (!uuid) throw new HttpException(500, "Validation error")
    const deleteUserData: UserDbType = await User.Model.findOneAndDelete({
      id: uuid,
    })
      .lean<UserDbType>()
      .exec()

    if (!deleteUserData) {
      throw new HttpException(404, "User not found")
    }

    return deleteUserData
  }
}

export { User, UserCreateType, UserDbType }
