import { NextFunction, Request, Response } from "express"
import { EmergencyContact, RequestWithUser } from "../interfaces/user.interface"
import {
  Patient,
  PatientDbType,
  PatientPopulateType,
  PatientRefDbType,
} from "../models/patient.model"
import { Therapist, TherapistRefDbType } from "../models/therapist.model"
import { TherapistGETResponseType } from "./therapist.controller"

type PatientGETResponseType = {
  name: string
  userId: string
  therapist: TherapistRefDbType
}

type PatientPopulateGETResponseType = {
  name: string
  userId: string
  therapist: TherapistGETResponseType
  emergencyContact: EmergencyContact
}

export class PatientController {
  private filterResponseData(data: PatientDbType): { id: string } {
    return { id: data.id }
  }

  private filterGETResponseData(data: PatientDbType): PatientGETResponseType {
    return { name: data.name, userId: data.userId, therapist: data.therapist }
  }

  private filterPopulateGETResponseData(
    data: PatientPopulateType
  ): PatientPopulateGETResponseType {
    const { name, userId, therapist, emergencyContact } = data
    if (therapist) {
      return {
        name,
        userId,
        emergencyContact,
        therapist: {
          userId: therapist._id.userId,
          name: therapist._id.name,
          profile: therapist._id.profile,
        },
      }
    } else {
      return {
        name,
        userId,
        emergencyContact,
        therapist: null,
      }
    }
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

  public getPatient = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const patientUserId: string = req.user.id
    const findOnePatientData: PatientPopulateType =
      await Patient.getPopulateByUserUUID(patientUserId)
    const filteredData = this.filterPopulateGETResponseData(findOnePatientData)
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

  public assignTherapist = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const patientUserId: string = req.user.id
    const therapistUserId: string = req.body.id
    const therapistRef: TherapistRefDbType = await Therapist.getRefByUserUUID(
      therapistUserId
    )
    const patientData: PatientDbType = await Patient.addTherapistByUserUUID(
      patientUserId,
      therapistRef
    )
    const patientRef: PatientRefDbType = await Patient.convertToRef(patientData)
    const therapistData = await Therapist.addPatientByUserUUID(
      therapistUserId,
      patientRef
    )

    res.status(200).json({
      data: therapistData,
      message: "Therapist assigned",
    })
  }

  public unassignTherapist = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const patientUserId: string = req.user.id
    const therapistUserId: string = req.body.id
    const patientData: PatientDbType = await Patient.removeTherapistByUserUUID(
      patientUserId
    )
    const therapistData = await Therapist.removePatientByUserUUID(
      therapistUserId,
      patientData.id
    )

    res.status(200).json({
      data: therapistData,
      message: "Therapist unassigned",
    })
  }

  public updateEmergencyContact = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const patientUserId: string = req.user.id
    const patientData: PatientDbType = req.body
    const updatePatientData: PatientDbType = await Patient.updateByUserUUID(
      patientUserId,
      patientData
    )
    const newEmergencyContactData = updatePatientData.emergencyContact
    res.status(200).json({
      data: newEmergencyContactData,
      message: "Patient emergency contact updated",
    })
  }
}
