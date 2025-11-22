const mongoose = require('mongoose');
require('dotenv').config();
const WorkoutLog = require('./models/WorkoutLog');

const inspectLogs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const logs = await WorkoutLog.find().sort({ date: -1 });
        console.log('--- All Workout Logs ---');
        logs.forEach(log => {
            console.log(`ID: ${log._id}`);
            console.log(`Date: ${log.date.toISOString().split('T')[0]}`);
            console.log(`Weight: ${log.weight}`);
            console.log('------------------------');
        });

        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
};

inspectLogs();
