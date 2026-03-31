const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model defined

// User registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
});

// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('User not found');
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send('Invalid password');
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' }); // Use your own secret key
    res.json({ token });
});

// Token refresh
router.post('/refresh-token', (req, res) => {
    const token = req.body.token;
    if (!token) return res.status(401).send('No token provided');
    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) return res.status(403).send('Forbidden');
        const newToken = jwt.sign({ id: decoded.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token: newToken });
    });
});

module.exports = router;