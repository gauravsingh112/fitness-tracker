const mongoose = require('mongoose');
require('dotenv').config();
const WorkoutLog = require('./models/WorkoutLog');

const clearLogs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const result = await WorkoutLog.deleteMany({});
        console.log(`Deleted ${result.deletedCount} logs.`);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
    }
};

clearLogs();
