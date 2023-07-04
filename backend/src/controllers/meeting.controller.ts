import mongoose from "mongoose";
const Meeting = require('../models/meeting.model')
const Therapist = require('../models/therapist.model')

// schedule meeting
const scheduleMeeting = async (req: any, res: any) => {
    const {patientId, therapistId, startDate, endDate, topic} = req.body

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(404).json({error: 'Invalid patient ID'})
    } else if (!mongoose.Types.ObjectId.isValid(therapistId)) {
        return res.status(404).json({error: 'Invalid therapist ID'})
    }

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
const getSortedUpcoming = async (req: any, res: any) => {
    const {id, isUser} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid ID'})
    }

    try {
        // limit by only dates today and after, then sort by earliest date first
        const meetings = await Meeting.find({
            $and: [
                {startDate: {$gte: new Date()}},
                isUser ? {patientId: id} : {therapistId: id}
            ]
        }).sort({startDate: 1})

        if (meetings) {
            return res.status(200).json(meetings)
        } else {
            return res.status(200).json({message: 'Cannot find user/therapist'})
        }

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// list all therapists in db
const listTherapists = async (req: any, res: any) => {
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