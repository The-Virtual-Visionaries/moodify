import { Schema, Types } from "mongoose"

export const TherapistRefSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true, ref: "Therapist" },
    id: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { _id: false }
)

export const PatientRefSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true, ref: "Patient" },
    id: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { _id: false }
)
