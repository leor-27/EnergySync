// server/routes/users.js
const express = require('express');
const router = express.Router();
const { activity_logs } = require('../models'); // Import Sequelize Model

// Get all users
router.get('/', async (req, res) => {
  try {

    const logs = await activity_logs.findAll({
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: logs
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

// Create a user
router.post('/', async (req, res) => {
  try {
  const newActivityLog = await activity_logs.create(req.body);
  res.json({ success: true, data: newActivityLog });

    } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

module.exports = router;