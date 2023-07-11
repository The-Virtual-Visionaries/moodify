const mongoose = require('mongoose')
const Usermood = require('../models/usermood.model')
import { NextFunction, Request, Response } from "express"
import { RequestWithUser } from "../interfaces/user.interface"
import { error } from "console"
import axios from 'axios'
import config from "../config"


// get all user moods
const getUsermoods = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
    ) => {
    const userId: string = req.user.id

    const usermoods = await Usermood.findOne({patientId: userId})

    if (!usermoods) {
        const newUsermood = new Usermood({
            patientId: userId,
            moods: [],
            streak: 0
          });
        
        await newUsermood.save();
        console.log("getUSermoods")
        return res.status(200).json([])
    }

    res.status(200).json(usermoods.moods)
}

// get user mood for the day
const dayUsermood = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
    ) => {
    const userId: string = req.user.id
    const date = req.query.date
    try {
        const usermood = await Usermood.findOne({patientId: userId})
        if (!usermood) {
            return res.status(200).json({data: {valid:false, mood: {date:"", entry: "", mood: ""}}})
        }
        const moods = usermood.moods
        // search array of json objects for date
        for (let i = 0; i < moods.length; i++) {
            if (moods[i].date === date) {
                return res.status(200).json({data: {valid:true, mood: moods[i]}})
            }
        }
        return res.status(200).json({data: {valid:false, mood: {date:"", entry: "", mood: ""}}})

    } catch (error) {
        return res.status(404).json({data: {valid:false, mood: {date:"", entry: "", mood: ""}}, error: error})
    }
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
              return res.status(200).json({message: 'New usermood added', mood: mood})

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
                return res.status(200).json({message: 'Mood added, streak increased', mood: mood})
            } else {
                // reset streak to 1 and add mood to moods array
                const newStreak = await Usermood.updateOne(
                    {patientId: patientId},
                    {
                        $set: {streak: 1},
                        $push: {moods: {date: todayDate, entry: entry, mood: mood}}
                    }
            
                )
                return res.status(200).json({message: 'Mood add, streak reset', mood: mood})
            }
        }
    } catch (error) {
        res.status(400).json({message: error.message, mood:""})
    }

}
// call mood ai api
async function apiCall(entry) {
    const url = `${config.AI_URI}/sentiment?sentence=${encodeURIComponent(entry)}`
    
    try {
        const response = await axios.get(url)
        const data = await response.data
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
        const newUsermood = new Usermood({
            patientId: userId,
            moods: [],
            streak: 0
          });
        
        await newUsermood.save();
        console.log("getStreak")
        return res.status(200).json(0)
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

    return res.status(200).json(usermoods.streak)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json(-1)
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
        const newUsermood = new Usermood({
            patientId: pid,
            moods: [],
            streak: 0
          });
        
        await newUsermood.save();
        console.log("checkMoodInputToday")
        return res.status(200).json(false)
    }

    const timestamp = Date.now()
    const today = new Date(timestamp)
    // YYYY-MM-DD
    const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    if (usermoods.moods.find(mood => mood.date === todayDate)) {
        return res.status(200).json(true)
    } else {
        res.status(200).json(false)
    }
}

module.exports = {
    getUsermoods,
    addUsermood,
    getStreak,
    checkMoodInputToday,
    dayUsermood
}