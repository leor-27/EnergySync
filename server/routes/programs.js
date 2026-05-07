const express = require('express');
const router = express.Router();
const { Program } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  const programs = await Program.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: programs });
});

router.post('/', async (req, res) => {
  const newProgram = await Program.create(req.body);
  res.json({ success: true, data: newProgram });
});

module.exports = router;