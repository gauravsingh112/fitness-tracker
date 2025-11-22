const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    theme: {
        type: String,
        default: 'dark'
    },
    notifications: {
        type: Boolean,
        default: true
    },
    // Store other customization options here
    customColors: {
        primary: String,
        secondary: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
