const express = require('express');
const router = express.Router();
const { Program_Schedule } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  const program_schedules = await Program_Schedule.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: program_schedules });
});

router.post('/', async (req, res) => {
  const newProgramSchedule = await Program_Schedule.create(req.body);
  res.json({ success: true, data: newProgramSchedule });
});

module.exports = router;