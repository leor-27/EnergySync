const express = require('express');
const router = express.Router();

const { Program_Schedule } = require('../models');


// GET PROGRAM SCHEDULES
router.get('/', async (req, res) => {
  try {

    const program_schedules =
      await Program_Schedule.findAll({
        order: [['createdAt', 'DESC']]
      });

    res.json({
      success: true,
      data: program_schedules
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});


// CREATE PROGRAM SCHEDULE
router.post('/', async (req, res) => {
  try {

    const newProgramSchedule =
      await Program_Schedule.create(req.body);

    res.json({
      success: true,
      data: newProgramSchedule
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

module.exports = router;