require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Fitness Tracker Backend is Running');
});

const logsRouter = require('./routes/logs');
const settingsRouter = require('./routes/settings');
const authRouter = require('./routes/auth');

app.use('/api/logs', logsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
