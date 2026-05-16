const express = require('express');
const router = express.Router();

const { Program_DJ_Assignment } = require('../models');

router.get('/', async (req, res) => {
  try {

    const program_dj_assignments =
      await Program_DJ_Assignment.findAll({
        order: [['assignment_ID', 'DESC']]
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

router.post("/assign-dj", async (req, res) => {

  const {
    dj_ID,
    program_ID,
    admin_ID,
    start_date
  } = req.body;

  try {

    await db.query(
      "CALL sp_AdminAssignDJ(?, ?, ?, ?)",
      {
        replacements: [
          dj_ID,
          program_ID,
          admin_ID,
          start_date
        ]
      }
    );

    res.json({
      success: true,
      message: "DJ assigned successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false
    });

  }

});

module.exports = router;