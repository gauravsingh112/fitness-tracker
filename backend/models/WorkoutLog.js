const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        unique: true
    },
    habits: [{
        type: String
    }],
    meals: [{
        type: String
    }],
    exercises: [{
        type: Number
    }],
    weight: {
        type: Number
    },
    notes: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('WorkoutLog', workoutLogSchema);
