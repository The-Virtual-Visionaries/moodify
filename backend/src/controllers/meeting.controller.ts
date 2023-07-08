import mongoose from "mongoose";
const Meeting = require('../models/meeting.model')
const Therapist = require('../models/therapist.model')
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
    const isUser = req.body.isUser === 'true'
    console.log(id)
    console.log(isUser)
    try {
        // limit by only dates today and after, then sort by earliest date first
        const meetings = await Meeting.find({
            $and: [
                {startDate: {$gte: new Date()}},
                isUser ? {patientId: id} : {therapistId: id}
            ]
        }).sort({startDate: 1})

        console.log(meetings)
        if (meetings) {
            return res.status(200).json({data: meetings, message: 'Found upcoming meetings'})
        } else {
            return res.status(200).json({message: 'Cannot find user/therapist'})
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
        const therapists = await Therapist.find({}).distinct('therapistId')
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