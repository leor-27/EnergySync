const express = require('express');
const router = express.Router();

const { Notifications } = require('../models');

router.get('/', async (req, res) => {
  try {

    const notifications = await Notifications.findAll({
      order: [['notification_ID', 'DESC']]
    });

    res.json({
      success: true,
      data: notifications
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});


// router.post('/', async (req, res) => {
//   try {

//     const newNotification =
//       await Notifications.create(req.body);

//     res.json({
//       success: true,
//       data: newNotification
//     });

//   } catch (err) {

//     res.status(500).json({
//       success: false,
//       message: err.message
//     });

//   }
// });

module.exports = router;