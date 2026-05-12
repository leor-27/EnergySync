const express = require('express');
const router = express.Router();
const { Admin } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  try {
  const admins = await Admin.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: admins });
    } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

router.post('/', async (req, res) => {
  try {
  const newAdmin = await Admin.create(req.body);
  res.json({ success: true, data: newAdmin });
    } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

module.exports = router;