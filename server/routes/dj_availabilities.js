const express = require('express');
const router = express.Router();
const { DJ_Availability } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  const dj_availabilities = await DJ_Availability.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: dj_availabilities });
});

router.post('/', async (req, res) => {
  const newDjAvailability = await DJ_Availability.create(req.body);
  res.json({ success: true, data: newDjAvailability });
});

module.exports = router;