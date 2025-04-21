const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driver.controller');

// Get Driver Profile
router.get('/profile/:id', driverController.getDriverProfile);


module.exports = router;
