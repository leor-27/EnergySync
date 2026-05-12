const express = require('express');
const router = express.Router();
const { Substitutions } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  try {
  const substitutions = await Substitutions.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: substitutions });
    } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
  const newSubstitution = await Substitutions.create(req.body);
  res.json({ success: true, data: newSubstitution });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;