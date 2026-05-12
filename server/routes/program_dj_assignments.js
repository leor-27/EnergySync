const express = require('express');
const router = express.Router();

const { Program_DJ_Assignment } = require('../models');

router.get('/', async (req, res) => {
  try {

    const program_dj_assignments =
      await Program_DJ_Assignment.findAll({
        order: [['createdAt', 'DESC']]
      });

    res.json({
      success: true,
      data: program_dj_assignments
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});


router.post('/', async (req, res) => {
  try {

    const newProgramDjAssignment =
      await Program_DJ_Assignment.create(req.body);

    res.json({
      success: true,
      data: newProgramDjAssignment
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

module.exports = router;