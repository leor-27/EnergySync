const express = require('express');
const router = express.Router();
const { DJ_Availability } = require('../models'); // Import Sequelize Model

router.get('/', async (req, res) => {
  try {

    const dj_availabilities =
      await DJ_Availability.findAll({
        order: [['created_at', 'DESC']]
      });

    res.json({
      success: true,
      data: dj_availabilities
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

module.exports = router;