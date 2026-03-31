// routes/index.js

const express = require('express');
const authRoutes = require('./auth');
const conversionRoutes = require('./conversion');

const router = express.Router();

// Auth routes
router.use('/auth', authRoutes);

// Conversion routes
router.use('/conversion', conversionRoutes);

module.exports = router;
