const mongoose = require('mongoose')
const Usermood = require('../models/usermood.model')
import { NextFunction, Request, Response } from "express"
import { RequestWithUser } from "../interfaces/user.interface"
import { error } from "console"

// get all user moods
const getUsermoods = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
    ) => {
    const userId: string = req.user.id

    const usermoods = await Usermood.findOne({patientId: userId})

    if (!usermoods) {
        return res.status(404).json({error: 'No such user with moods'})
    } else if (!usermoods.moods) {
        return res.status(404).json({error: 'Missing moods array'})
    }

    res.status(200).json(usermoods.moods)
}

// add user mood for the day
// IMPORTANT: Can technically add twice if allowed multiple access to button that triggers it,
// but using checkMoodInputToday() to enforce daily access to button fixes it.
// Can also be fixed with extra query
const addUsermood = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
    ) => {
    const patientId: string = req.user.id
    const {entry} = req.body

    try {
        const usermoods = await Usermood.findOne({patientId: patientId})
        const timestamp = Date.now()
        const today = new Date(timestamp)
        // YYYY-MM-DD
        const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        const yesterday = new Date(timestamp - 86400000)
        const yesterdayDate = yesterday.getFullYear()+'-'+(yesterday.getMonth()+1)+'-'+yesterday.getDate()

        // call ai api
        const moodPrediction = await apiCall(entry);
        console.log(moodPrediction[0].label);
        // const moodPrediction = [
        //     {
        //     label: "happy",
        //     score: 0.9999999999999999,
        //     },
        // ];
        const mood = moodPrediction[0].label;

        if (!usermoods) {
            const newUsermood = new Usermood({
                patientId: patientId,
                moods: [{
                  date: todayDate,
                  entry: entry,
                  mood: mood
                }],
                streak: 1
              });
            
              await newUsermood.save();
              return res.status(200).json({message: 'New usermood added'})

        } else {
            const moods = usermoods.moods
            const streak = usermoods.streak
            // check if mood has input yesterday
            const yesterdayMood = moods.find(mood => mood.date === yesterdayDate)
            if (yesterdayMood) {
                // add 1 to streak and add mood to moods array
                const newStreak = await Usermood.updateOne(
                    {patientId: patientId},
                    {
                        $inc: {streak: 1},
                        $push: {moods: {date: todayDate, entry: entry, mood: mood}}

                    }
                )
                return res.status(200).json({message: 'Mood added, streak increased'})
            } else {
                // reset streak to 1 and add mood to moods array
                const newStreak = await Usermood.updateOne(
                    {patientId: patientId},
                    {
                        $set: {streak: 1},
                        $push: {moods: {date: todayDate, entry: entry, mood: mood}}
                    }
            
                )
                return res.status(200).json({message: 'Mood add, streak reset'})
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}
// call mood ai api
async function apiCall(entry) {
    const url = `https://backend-dwylqlwgmq-uc.a.run.app/sentiment?sentence=${encodeURIComponent(entry)}`
    
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
  };


// get user streak for mood page
const getStreak = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId: string = req.user.id

    const usermoods = await Usermood.findOne({patientId: userId})

    if (!usermoods) {
        throw new Error('No such user with moods')
    } else if (!usermoods.streak) {
        throw new Error('Missing streak')
    }
    // if yesterday no input mood, streak resets to 0
    // then if today have input mood, streak becomes 1

    const timestamp = Date.now()
    const today = new Date(timestamp)
    // YYYY-MM-DD
    const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    const todayMood = usermoods.moods.find(mood => mood.date === todayDate)
    const yesterday = new Date(timestamp - 86400000)
    // YYYY-MM-DD
    const yesterdayDate = yesterday.getFullYear()+'-'+(yesterday.getMonth()+1)+'-'+yesterday.getDate()
    const yesterdayMood = usermoods.moods.find(mood => mood.date === yesterdayDate)
    if (!yesterdayMood) {
        if (!todayMood) {
            const newStreak = await Usermood.updateOne(
                {patientId: userId},
                {
                    $set: {streak: 0}
                }
            )
            return res.status(200).json(0)
        }
    }

    res.status(200).json(usermoods.streak)
    } catch (error) {
        console.log(error.message)
        return -1
    }
    
}

const checkMoodInputToday = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const pid: string = req.user.id

    const usermoods = await Usermood.findOne({patientId: pid})

    if (!usermoods) {
        return res.status(404).json({error: 'No such user'})
    } else if (!usermoods.moods) {
        return res.status(404).json({error: 'Missing moods array'})
    }

    const timestamp = Date.now()
    const today = new Date(timestamp)
    // YYYY-MM-DD
    const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    if (usermoods.moods.find(mood => mood.date === todayDate)) {
        res.status(200).json(true)
    } else {
        res.status(200).json(false)
    }
}

module.exports = {
    getUsermoods,
    addUsermood,
    getStreak,
    checkMoodInputToday
}