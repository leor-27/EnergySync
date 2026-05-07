const express = require('express');
const router = express.Router();
const { DJ } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  const djs = await DJ.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: djs });
});

router.post('/', async (req, res) => {
  const newDj = await DJ.create(req.body);
  res.json({ success: true, data: newDj });
});

module.exports = router;