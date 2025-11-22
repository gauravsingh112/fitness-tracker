const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { name, email, picture, sub: googleId } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email,
                picture,
                googleId
            });
            await user.save();
        } else {
            // Update user info if changed
            user.name = name;
            user.picture = picture;
            user.googleId = googleId;
            user.lastLogin = Date.now();
            await user.save();
        }

        // Create JWT Token for our app
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
        res.status(401).json({ message: 'Invalid Token' });
    }
});

module.exports = router;
