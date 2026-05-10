// server/routes/users.js
const express = require('express');
const router = express.Router();
const { activity_logs } = require('../models'); // Import Sequelize Model

// Get all users
router.get('/', async (req, res) => {
  const activity_logs = await activity_logs.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: activity_logs });
});

// Create a user
router.post('/', async (req, res) => {
  const newActivityLog = await activity_logs.create(req.body);
  res.json({ success: true, data: newActivityLog });
});

module.exports = router;