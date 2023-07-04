import { NextFunction, Request, Response } from "express"
import { Patient, PatientDbType } from "../models/patient.model"

type PatientGETResponseType = {
  userId: string
}

export class PatientController {
  private filterResponseData(data: PatientDbType): { id: string } {
    return { id: data.id }
  }

  private filterGETResponseData(data: PatientDbType): PatientGETResponseType {
    return { userId: data.userId }
  }

  public getPatients = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const findAllPatientsData: PatientDbType[] = await Patient.getAll()
    const filteredData = findAllPatientsData.map(this.filterGETResponseData)
    res.status(200).json({ data: filteredData, message: "Found all patients" })
  }

  public getPatientById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const patientId: string = req.params.id
    const findOnePatientData: PatientDbType = await Patient.getByUUID(patientId)
    const filteredData = this.filterGETResponseData(findOnePatientData)
    res.status(200).json({ data: filteredData, message: "Patient found" })
  }

  public createPatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const patientData: PatientDbType = req.body
    const createPatientData: PatientDbType = await Patient.create(patientData)
    const filteredData = this.filterResponseData(createPatientData)
    res.status(200).json({ data: filteredData, message: "Patient created" })
  }

  public updatePatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const patientId: string = req.params.id
    const patientData: PatientDbType = req.body
    const updatePatientData: PatientDbType = await Patient.updateByUUID(
      patientId,
      patientData
    )
    const filteredData = this.filterResponseData(updatePatientData)
    res.status(200).json({ data: filteredData, message: "Patient updated" })
  }
}
