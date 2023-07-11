import mongoose, {Types} from "mongoose";
const Meeting = require('../models/meeting.model')
import { Therapist, TherapistDbType } from "../models/therapist.model"
import { Patient, PatientDbType } from "../models/patient.model"
import { NextFunction, Request, Response } from "express"
import { RequestWithUser } from "../interfaces/user.interface"

// schedule meeting
const scheduleMeeting = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const patientId = req.user.id
    const {therapistId, startDate, endDate, topic} = req.body

    try {
        // need pass in therapist shorter id here, which means need pass out therapist id in listTherapists
        const newMeeting = new Meeting({
            patientId: patientId,
            therapistId: therapistId,
            startDate: startDate,
            endDate: endDate,
            topic: topic
        })

        await newMeeting.save()
        return res.status(200).json({message: 'New meeting scheduled'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// get sorted upcoming meetings
const getSortedUpcoming = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const id: string = req.user.id
    const isUser = req.query.isUser === 'true'
    try {
         // limit by only dates today and after, then sort by earliest date first
         const meetings = await Meeting.find({
            $and: [
                isUser ? {patientId: id} : {therapistId: id}
            ]
        }).sort({startDate: 1}).catch(error => console.error(error));

        // currently meeting saves using therapist object id, so use that to search Therapist collection
        if (meetings) {
            if (isUser){
                const consultationSlots = meetings.map(async (slot) => {
                    const id = slot.therapistId;
                    // TODO get therapist name
                    const therapist = await Therapist.getByUserUUID(id)
                    return {
                        startDate: new Date(slot.startDate),
                        endDate: new Date(slot.endDate),
                        name: therapist.name,
                        topic: slot.topic
                    };
                });
                const output = await Promise.all(consultationSlots);
                return res.status(200).json({data: output, message: 'Found upcoming meetings'})
            } else {
                console.log("therapist")
                const consultationSlots = meetings.map(async (slot) => {
                    const id = slot.patientId;
                    // TODO get therapist name
                    console.log("patient" + id)
                    const patient = await Patient.getByUserUUID(id)
                    return {
                        startDate: new Date(slot.startDate),
                        endDate: new Date(slot.endDate),
                        name: patient.name,
                        topic: slot.topic
                    };
                });
                const output = await Promise.all(consultationSlots);
                return res.status(200).json({data: output, message: 'Found upcoming meetings'})
            }
            
        } else {
            return res.status(404).json({data: [], message: 'Cannot find user/therapist'})
        }

    } catch (error) {
        res.status(400).json({error: error.message})
    }
       
}

// list all therapists in db
const listTherapists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // const therapists = await Therapist.find({}).distinct('therapistId')
        const therapists = "blank"
        return res.status(200).json(therapists)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {
    scheduleMeeting,
    getSortedUpcoming,
    listTherapists
}