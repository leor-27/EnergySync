const express = require('express');
const router = express.Router();
const { Schedule_Day_Type } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  const schedule_day_types = await Schedule_Day_Type.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: schedule_day_types });
});

router.post('/', async (req, res) => {
  const newScheduleDayType = await Schedule_Day_Type.create(req.body);
  res.json({ success: true, data: newScheduleDayType });
});

module.exports = router;