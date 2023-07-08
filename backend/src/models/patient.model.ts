import { Document, Model, Schema, Types, model } from "mongoose"
import { HttpException } from "../exceptions/httpException"
import { PatientProfile } from "../interfaces/user.interface"
import { generateString } from "../utils/generateRandom"
import { TherapistRefSchema } from "./refSchema.model"
import { TherapistRefDbType } from "./therapist.model"

interface PatientDbType extends Document {
  _id: Types.ObjectId
  id: string
  userId: string
  name: string
  profile: PatientProfile
  therapist: TherapistRefDbType
}

interface PatientRefDbType {
  _id: Types.ObjectId
  id: string
  userId: string
}

interface PatientCreateType {
  userId: string
  name: string
}

class Patient {
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
    },
    therapist: { type: TherapistRefSchema, default: null },
  })

  private static Model: Model<PatientDbType> = model<PatientDbType>(
    "Patient",
    Patient.Schema,
    "Patients"
  )

  public static create = async (
    patient: PatientCreateType
  ): Promise<PatientDbType> => {
    if (!patient) throw new HttpException(500, "Validation error")
    const newPatient = await Patient.Model.create(patient)
    if (!newPatient)
      throw new HttpException(500, "Patient creation unsuccessful")
    return newPatient.toObject({ getters: true }) as PatientDbType
  }

  public static getById = async (
    id: Types.ObjectId
  ): Promise<PatientDbType | null> => {
    if (!id) throw new HttpException(500, "Validation error")
    const patient: PatientDbType = await Patient.Model.findOne({
      _id: id,
    })
      .lean<PatientDbType>()
      .exec()
    if (!patient) {
      throw new HttpException(404, "Patient not found")
    }
    return patient
  }

  public static getAll = async (): Promise<PatientDbType[]> => {
    return Patient.Model.find().lean<PatientDbType[]>().exec()
  }

  public static getByUUID = async (
    uuid: string
  ): Promise<PatientDbType | null> => {
    if (!uuid) throw new HttpException(500, "Validation error")
    const patient: PatientDbType = await Patient.Model.findOne({
      id: uuid,
    })
      .lean<PatientDbType>()
      .exec()
    if (!patient) {
      throw new HttpException(404, "Patient not found")
    }
    return patient
  }

  public static getByUserUUID = async (
    userId: string
  ): Promise<PatientDbType> => {
    if (!userId) throw new HttpException(500, "Validation error")
    const patient: PatientDbType = await Patient.Model.findOne({
      userId: userId,
    })
      .lean<PatientDbType>()
      .exec()
    if (!patient) {
      throw new HttpException(404, "Patient not found")
    }
    return patient
  }

  public static updateByUUID = async (
    uuid: string,
    patient: PatientDbType
  ): Promise<PatientDbType | null> => {
    if (!uuid || !patient) throw new HttpException(500, "Validation error")
    const existingPatient: PatientDbType = await Patient.getByUUID(uuid)
    if (!existingPatient) throw new HttpException(404, "Patient doesn't exist")

    const updatePatientData: PatientDbType =
      await Patient.Model.findOneAndUpdate({ id: uuid }, patient, {
        new: true,
      })
        .lean<PatientDbType>()
        .exec()

    if (!updatePatientData) {
      throw new HttpException(404, "Patient not found")
    }

    return updatePatientData
  }

  public static updateByUserUUID = async (
    uuid: string,
    patient: PatientDbType
  ): Promise<PatientDbType | null> => {
    if (!uuid || !patient) throw new HttpException(500, "Validation error")
    const existingPatient: PatientDbType = await Patient.getByUserUUID(uuid)
    if (!existingPatient) throw new HttpException(404, "Patient doesn't exist")

    const updatePatientData: PatientDbType =
      await Patient.Model.findOneAndUpdate({ userId: uuid }, patient, {
        new: true,
      })
        .lean<PatientDbType>()
        .exec()

    if (!updatePatientData) {
      throw new HttpException(404, "Patient not found")
    }

    return updatePatientData
  }

  public static addTherapistByUserUUID = async (
    uuid: string,
    therapistRef: TherapistRefDbType
  ): Promise<PatientDbType | null> => {
    if (!uuid || !therapistRef) throw new HttpException(500, "Validation error")
    const updatePatientData: PatientDbType = await this.Model.findOneAndUpdate(
      { userId: uuid },
      { $set: { therapist: therapistRef } },
      { new: true }
    )
      .lean<PatientDbType>()
      .exec()

    if (!updatePatientData) {
      throw new HttpException(404, "Patient not found")
    }
    return updatePatientData
  }

  public static removeTherapistByUserUUID = async (
    uuid: string
  ): Promise<PatientDbType | null> => {
    if (!uuid) throw new HttpException(500, "Validation error")
    const updatePatientData: PatientDbType = await this.Model.findOneAndUpdate(
      { userId: uuid },
      { $set: { therapist: null } },
      { new: true }
    )
      .lean<PatientDbType>()
      .exec()

    if (!updatePatientData) {
      throw new HttpException(404, "Patient not found")
    }
    return updatePatientData
  }

  public static convertToRef = async (
    patient: PatientDbType
  ): Promise<PatientRefDbType> => {
    if (!patient) throw new HttpException(500, "Validation error")
    return {
      _id: patient._id,
      id: patient.id,
      userId: patient.userId,
    }
  }
}

export { Patient, PatientCreateType, PatientDbType, PatientRefDbType }
