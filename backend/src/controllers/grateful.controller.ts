const Grateful = require('../models/grateful.model')
import mongoose, {Types} from "mongoose"
import { NextFunction, Request, Response } from "express"
import { RequestWithUser } from "../interfaces/user.interface"

// get all user gratefuls
const getGratefuls = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const pid: string = req.user.id

    const gratefuls = await Grateful.findOne({patientId: pid})

    if (!gratefuls) {
        return res.status(404).json({error: 'No such user with gratefuls'})
    } else if (!gratefuls.gratefuls) {
        return res.status(404).json({error: 'Missing gratefuls array'})
    }
    res.status(200).json(gratefuls.gratefuls)
    
}

// add user grateful for the day
const addGrateful = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const patientId: string = req.user.id
    const {grateful} = req.body

    try {
        const currentGratefuls = await Grateful.findOne({patientId: patientId})
        const timestamp = Date.now()
        const today = new Date(timestamp)
        // YYYY-MM-DD
        const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        if (!currentGratefuls) {
            const newGrateful = new Grateful({
                patientId: patientId,
                gratefuls: [{
                    date: todayDate,
                    grateful: grateful
                    }],
              });
            
              await newGrateful.save();
              return res.status(200).json({message: 'First grateful added'})

        } else {
            const newStreak = await Grateful.updateOne(
                {patientId: patientId},
                {
                    $push: {gratefuls: {date: todayDate, grateful: grateful}}

                }
            )
            return res.status(200).json({message: 'Grateful added'})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// delete user grateful for the day

const deleteGrateful = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const patientId: string = req.user.id
    const objectId = req.query.objectId
    console.log(objectId)

    const id = objectId

    try {
        const currentGratefuls = await Grateful.findOne({patientId: patientId})
        if (!currentGratefuls) {
            return res.status(404).json({error: 'No such user with gratefuls'})
        } else if (!currentGratefuls.gratefuls) {
            return res.status(404).json({error: 'Missing gratefuls array'})
        }
        // delete if same date and grateful
        const newGratefuls = currentGratefuls.gratefuls.filter((g: any) => {
            return g._id != id
        })
        const newStreak = await Grateful.updateOne(
            {patientId: patientId},
            {
                $set: {gratefuls: newGratefuls}
            }
        )
        return res.status(200).json({message: 'Grateful deleted'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    addGrateful,
    getGratefuls,
    deleteGrateful,
}