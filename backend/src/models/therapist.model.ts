import { Document, Model, Schema, Types, model } from "mongoose"
import { generateString } from "../utils/generateRandom"
import { HttpException } from "../exceptions/httpException"

interface TherapistDbType extends Document {
  _id: Types.ObjectId
  id: string
  userId: string
  favouriteColour: string // placeholder field
}

interface TherapistCreateType {
  userId: string
}

class Therapist {
  private static Schema: Schema = new Schema({
    id: {
      type: String,
      unique: true,
      required: true,
      default: () => generateString(10),
    },
    userId: { type: String, required: true, unique: true },
    favouriteColour: { type: String, default: "blue" }, // placeholder field
  })

  private static Model: Model<TherapistDbType> = model<TherapistDbType>(
    "Therapist",
    Therapist.Schema,
    "Therapists"
  )

  public static create = async (
    therapist: TherapistCreateType
  ): Promise<TherapistDbType> => {
    if (!therapist) throw new HttpException(500, "Validation error")
    const newTherapist = await Therapist.Model.create(therapist)
    if (!newTherapist)
      throw new HttpException(500, "Therapist creation unsuccessful")
    return newTherapist.toObject({ getters: true }) as TherapistDbType
  }

  public static getById = async (
    id: Types.ObjectId
  ): Promise<TherapistDbType | null> => {
    if (!id) throw new HttpException(500, "Validation error")
    const therapist: TherapistDbType = await Therapist.Model.findOne({
      _id: id,
    })
      .lean<TherapistDbType>()
      .exec()
    if (!therapist) {
      throw new HttpException(404, "Therapist not found")
    }
    return therapist
  }

  public static getAll = async (): Promise<TherapistDbType[]> => {
    return Therapist.Model.find().lean<TherapistDbType[]>().exec()
  }

  public static getByUUID = async (
    uuid: string
  ): Promise<TherapistDbType | null> => {
    if (!uuid) throw new HttpException(500, "Validation error")
    const therapist: TherapistDbType = await Therapist.Model.findOne({
      id: uuid,
    })
      .lean<TherapistDbType>()
      .exec()
    console.log(therapist)
    if (!therapist) {
      throw new HttpException(404, "Therapist not found")
    }
    return therapist
  }

  public static updateByUUID = async (
    uuid: string,
    therapist: TherapistDbType
  ): Promise<TherapistDbType | null> => {
    if (!uuid || !therapist) throw new HttpException(500, "Validation error")
    const existingTherapist: TherapistDbType = await Therapist.getByUUID(uuid)
    if (!existingTherapist)
      throw new HttpException(404, "Therapist doesn't exist")

    const updateTherapistData: TherapistDbType =
      await Therapist.Model.findOneAndUpdate({ id: uuid }, therapist, {
        new: true,
      })
        .lean<TherapistDbType>()
        .exec()

    if (!updateTherapistData) {
      throw new HttpException(404, "Therapist not found")
    }

    return updateTherapistData
  }

  public static deleteByUUID = async (
    uuid: string
  ): Promise<TherapistDbType | null> => {
    if (!uuid) throw new HttpException(500, "Validation error")
    const deleteTherapistData: TherapistDbType =
      await Therapist.Model.findOneAndDelete({
        id: uuid,
      })
        .lean<TherapistDbType>()
        .exec()

    if (!deleteTherapistData) {
      throw new HttpException(404, "Therapist not found")
    }

    return deleteTherapistData
  }
}

export { Therapist, TherapistCreateType, TherapistDbType }
