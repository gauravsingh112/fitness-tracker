const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Get Settings
router.get('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            // Create default settings if none exist
            settings = new Settings();
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Settings
router.put('/', async (req, res) => {
    const { theme, notifications, customColors } = req.body;
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings();
        }

        settings.theme = theme || settings.theme;
        settings.notifications = notifications !== undefined ? notifications : settings.notifications;
        settings.customColors = customColors || settings.customColors;

        await settings.save();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
