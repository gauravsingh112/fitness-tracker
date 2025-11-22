const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Mock Login Endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            // Create new mock user if not exists
            user = new User({
                name: email.split('@')[0], // Use part of email as name
                email,
                picture: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`, // Generate avatar
                googleId: `mock_${Date.now()}`, // Dummy ID
                lastLogin: Date.now()
            });
            await user.save();
        } else {
            // Update last login
            user.lastLogin = Date.now();
            await user.save();
        }

        // Create JWT Token
        const appToken = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || 'fallback_secret_do_not_use_in_prod',
            { expiresIn: '30d' }
        );

        res.json({
            token: appToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture
            }
        });

    } catch (error) {
        console.error('Auth Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
