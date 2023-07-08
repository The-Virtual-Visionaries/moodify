import { Document, Model, Schema, Types, model } from "mongoose"
import { HttpException } from "../exceptions/httpException"
import { TherapistProfile } from "../interfaces/user.interface"
import { generateString } from "../utils/generateRandom"
import { PatientRefDbType } from "./patient.model"
import { PatientRefSchema } from "./refSchema.model"

interface TherapistDbType extends Document {
  _id: Types.ObjectId
  id: string
  userId: string
  name: string
  profile: TherapistProfile
  patients: PatientRefDbType[]
}

interface TherapistRefDbType {
  _id: Types.ObjectId
  id: string
  userId: string
}

interface TherapistCreateType {
  userId: string
  name: string
}

interface TherapistNestedId {
  _id: Types.ObjectId
  userId: string
  name: string
  profile: TherapistProfile
  id: string
  patients: PatientRefDbType[]
  __v: number
}

interface TherapistPopulatedRefDbType {
  _id: TherapistNestedId
}

interface TherapistResponseType {
  id: string
  userId: string
  name: string
  profile: TherapistProfile
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
    name: { type: String, required: true },
    profile: {
      username: { type: String, default: null },
      avatar: { type: String, default: null },
      mobile: { type: String, default: null },
      address: { type: String, default: null },
    },
    patients: { type: [PatientRefSchema], default: [] },
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
    if (!therapist) {
      throw new HttpException(404, "Therapist not found")
    }
    return therapist
  }

  public static getByUserUUID = async (
    userId: string
  ): Promise<TherapistDbType> => {
    if (!userId) throw new HttpException(500, "Validation error")
    const therapist: TherapistDbType = await Therapist.Model.findOne({
      userId: userId,
    })
      .lean<TherapistDbType>()
      .exec()
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

  public static updateByUserUUID = async (
    uuid: string,
    therapist: TherapistDbType
  ): Promise<TherapistDbType | null> => {
    if (!uuid || !therapist) throw new HttpException(500, "Validation error")
    const existingTherapist: TherapistDbType = await Therapist.getByUserUUID(
      uuid
    )
    if (!existingTherapist)
      throw new HttpException(404, "Therapist doesn't exist")

    const updateTherapistData: TherapistDbType =
      await Therapist.Model.findOneAndUpdate({ userId: uuid }, therapist, {
        new: true,
      })
        .lean<TherapistDbType>()
        .exec()

    if (!updateTherapistData) {
      throw new HttpException(404, "Therapist not found")
    }

    return updateTherapistData
  }

  public static addPatientByUserUUID = async (
    uuid: string,
    patientRef: PatientRefDbType
  ): Promise<TherapistDbType | null> => {
    if (!uuid || !patientRef) throw new HttpException(500, "Validation error")
    const updateTherapistData: TherapistDbType =
      await this.Model.findOneAndUpdate(
        { userId: uuid },
        { $push: { patients: patientRef } },
        { new: true }
      )
        .lean<TherapistDbType>()
        .exec()

    if (!updateTherapistData) {
      throw new HttpException(404, "Therapist not found")
    }
    return updateTherapistData
  }

  public static removePatientByUserUUID = async (
    uuid: string,
    patientId: string
  ): Promise<TherapistDbType | null> => {
    if (!uuid || !patientId) throw new HttpException(500, "Validation error")
    const updateTherapistData: TherapistDbType =
      await this.Model.findOneAndUpdate(
        { userId: uuid },
        { $pull: { patients: { id: patientId } } },
        { new: true }
      )
        .lean<TherapistDbType>()
        .exec()

    if (!updateTherapistData) {
      throw new HttpException(404, "Therapist not found")
    }
    return updateTherapistData
  }

  public static convertToRef = async (
    therapist: TherapistDbType
  ): Promise<TherapistRefDbType> => {
    if (!therapist) throw new HttpException(500, "Validation error")
    return {
      _id: therapist._id,
      id: therapist.id,
      userId: therapist.userId,
    }
  }

  public static getRefByUserUUID = async (
    uuid: string
  ): Promise<TherapistRefDbType> => {
    if (!uuid) throw new HttpException(500, "Validation error")
    const therapist: TherapistDbType = await this.getByUserUUID(uuid)
    if (!therapist) {
      throw new HttpException(404, "Therapist not found")
    }
    return therapist ? await this.convertToRef(therapist) : null
  }
}

export {
  Therapist,
  TherapistCreateType,
  TherapistDbType,
  TherapistRefDbType,
  TherapistResponseType,
  TherapistPopulatedRefDbType,
}
