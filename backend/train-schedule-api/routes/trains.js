// routes/trains.js
const express = require('express');
const router = express.Router();

// Import your handlers from a separate module
const { getTrainSchedules } = require('../controllers/trains');

// Define your routes
router.get('/schedules', getTrainSchedules);

module.exports = router;
