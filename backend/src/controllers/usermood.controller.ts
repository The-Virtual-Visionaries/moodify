const mongoose = require('mongoose')
const Usermood = require('../models/usermood.model')

// get all user moods
const getUsermoods = async (req, res) => {
    // in query link
    const {pid} = req.params

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(404).json({error: 'Invalid patient ID'})
    }

    const usermoods = await Usermood.findOne({patientId: pid})

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
const addUsermood = async (req, res) => {
    // pass in body as raw json object
    const {patientId, mood} = req.body

    if (!mongoose.Types.ObjectId.isValid(patientId)) {
        return res.status(404).json({error: 'Invalid patient ID'})
    }

    try {
        const usermoods = await Usermood.findOne({patientId: patientId})
        const timestamp = Date.now()
        const today = new Date(timestamp)
        // YYYY-MM-DD
        const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        const yesterday = new Date(timestamp - 86400000)
        const yesterdayDate = yesterday.getFullYear()+'-'+(yesterday.getMonth()+1)+'-'+yesterday.getDate()
        if (!usermoods) {
            const newUsermood = new Usermood({
                patientId: patientId,
                moods: [{
                  date: todayDate,
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
                        $push: {moods: {date: todayDate, mood: mood}}

                    }
                )
                return res.status(200).json({message: 'Mood added, streak increased'})
            } else {
                // reset streak to 1 and add mood to moods array
                const newStreak = await Usermood.updateOne(
                    {patientId: patientId},
                    {
                        $set: {streak: 1},
                        $push: {moods: {date: todayDate, mood: mood}}
                    }
            
                )
                return res.status(200).json({message: 'Mood add, streak reset'})
            }
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// get user streak for mood page
const getStreak = async (req, res) => {
    // in query link
    const {pid} = req.params

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(404).json({error: 'Invalid patient ID'})
    }

    const usermoods = await Usermood.findOne({patientId: pid})

    if (!usermoods) {
        return res.status(404).json({error: 'No such user'})
    } else if (!usermoods.streak) {
        return res.status(404).json({error: 'Missing streak'})
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
                {patientId: pid},
                {
                    $set: {streak: 0}
                }
            )
            return res.status(200).json(0)
        }
    }

    res.status(200).json(usermoods.streak)
}

const checkMoodInputToday = async (req, res) => {
    // in query link
    const {pid} = req.params

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(404).json({error: 'Invalid patient ID'})
    }

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