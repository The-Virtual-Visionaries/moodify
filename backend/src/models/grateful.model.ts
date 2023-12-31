import mongoose from "mongoose"

export interface Grateful {
  // date is in format YYYY-MM-DD
  date: string
  grateful: string
}

export interface Gratefuls {
  patientId: string
  gratefuls: Grateful[]
}

export interface GratefulDocument extends Grateful, mongoose.Document {}

export interface GratefulsDocument extends Gratefuls, mongoose.Document {}

const Schema = mongoose.Schema

const gratefulSchema = new Schema<GratefulDocument>({
  date: {
    type: String,
    required: true,
  },
  grateful: {
    type: String,
    required: true,
  },
})

const gratefulsSchema = new Schema<GratefulsDocument>({
  patientId: {
    type: String,
    required: true,
  },
  gratefuls: {
    type: [gratefulSchema],
    required: true,
    default: [],
  },
})

module.exports = mongoose.model("Grateful", gratefulsSchema)
