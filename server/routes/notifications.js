const express = require('express');
const router = express.Router();
const { Notifications } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  const notifications = await Notifications.findAll({ order: [['createdAt', 'DESC']] });
  res.json({ success: true, data: notifications });
});

router.post('/', async (req, res) => {
  const newNotification = await Notifications.create(req.body);
  res.json({ success: true, data: newNotification });
});

module.exports = router;