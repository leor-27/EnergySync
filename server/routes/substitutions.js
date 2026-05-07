const express = require('express');
const router = express.Router();
const { Substitutions } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  const substitutions = await Substitutions.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: substitutions });
});

router.post('/', async (req, res) => {
  const newSubstitution = await Substitutions.create(req.body);
  res.json({ success: true, data: newSubstitution });
});

module.exports = router;