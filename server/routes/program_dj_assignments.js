const express = require('express');
const router = express.Router();
const { Program_DJ_Assignment } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  const program_dj_assignments = await Program_DJ_Assignment.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: program_dj_assignments });
});

router.post('/', async (req, res) => {
  const newProgramDjAssignment = await Program_DJ_Assignment.create(req.body);
  res.json({ success: true, data: newProgramDJAssignment });
});

module.exports = router;