const express = require('express');
const router = express.Router();
const { Admin } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  const admins = await Admin.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: admins });
});

router.post('/', async (req, res) => {
  const newAdmin = await Admin.create(req.body);
  res.json({ success: true, data: newAdmin });
});

module.exports = router;