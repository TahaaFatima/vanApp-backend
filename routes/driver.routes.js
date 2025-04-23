// routes/driver.routes.js
const express = require('express');
const router = express.Router();
const { Driver, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.findAll({
      include: [{ model: User, attributes: ['email', 'profilePicture', 'phone'] }]
    });
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err });
  }
});

module.exports = router;
