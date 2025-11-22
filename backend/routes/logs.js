const express = require('express');
const router = express.Router();
const WorkoutLog = require('../models/WorkoutLog');

// Create or Update Log
router.post('/', async (req, res) => {
    const { date, habits, meals, exercises, weight, notes } = req.body;
    try {
        // Normalize date to start of day (UTC) to ensure uniqueness per day
        const inputDate = new Date(date);
        const startOfDay = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()));

        // Check if log exists for this date
        let log = await WorkoutLog.findOne({ date: startOfDay });

        if (log) {
            // Update existing
            log.habits = habits || log.habits;
            log.meals = meals || log.meals;
            log.exercises = exercises || log.exercises;
            log.weight = weight || log.weight;
            log.notes = notes || log.notes;
            await log.save();
        } else {
            // Create new
            log = new WorkoutLog({
                date: startOfDay,
                habits,
                meals,
                exercises,
                weight,
                notes
            });
            await log.save();
        }
        res.json(log);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get All Logs (All Day Report / All Time)
router.get('/', async (req, res) => {
    try {
        const logs = await WorkoutLog.find().sort({ date: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Report: Daily
router.get('/report/daily/:date', async (req, res) => {
    try {
        const date = new Date(req.params.date);
        const log = await WorkoutLog.findOne({ date: date });
        if (!log) return res.status(404).json({ message: 'No log found for this date' });
        res.json(log);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Report: Month to Date (MTD)
router.get('/report/mtd', async (req, res) => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const logs = await WorkoutLog.find({
            date: { $gte: startOfMonth, $lte: now }
        }).sort({ date: 1 });

        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get Report: Specific Date Range
router.get('/report/range', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Please provide startDate and endDate query parameters' });
        }

        const logs = await WorkoutLog.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ date: 1 });

        res.json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
