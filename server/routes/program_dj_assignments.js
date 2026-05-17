const express = require('express');
const router = express.Router();

const db = require('../models');

const Program_DJ_Assignment =
  db.Program_DJ_Assignment;

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

    await db.sequelize.query(
      "CALL sp_superadminAssignDJ(?, ?, ?, ?)",
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

router.get("/full", async (req, res) => {

  try {

    const [results] =
      await db.sequelize.query(`
        SELECT
          pda.assignment_ID,
          dj.stage_name,
          p.program_name,
          pda.effective_start_date,
          pda.effective_end_date,
          a.first_name AS assigned_by

        FROM Program_DJ_Assignment pda

        INNER JOIN DJ dj
          ON pda.dj_ID = dj.dj_ID

        INNER JOIN Program p
          ON pda.program_ID = p.program_ID

        LEFT JOIN Admin a
          ON pda.assigned_by_admin_ID = a.admin_ID
      `);

    res.json({
      success: true,
      data: results
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false
    });

  }

});

router.get("/detailed", async (req, res) => {

  try {

    const [results] =
      await db.sequelize.query(`

        SELECT
          pda.assignment_ID,
          dj.stage_name,
          p.program_name,
          pda.effective_start_date,
          pda.effective_end_date,
          a.first_name AS assigned_by

        FROM Program_DJ_Assignment pda

        INNER JOIN DJ dj
          ON pda.dj_ID = dj.dj_ID

        INNER JOIN Program p
          ON pda.program_ID = p.program_ID

        LEFT JOIN Admin a
          ON pda.assigned_by_admin_ID = a.admin_ID

      `);

    res.json({
      success: true,
      data: results
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});

router.get("/program-djs", async (req, res) => {

  try {

    const [results] =
      await db.sequelize.query(`

        SELECT
          pda.assignment_ID,
          p.program_name,
          dj.stage_name AS assigned_dj

        FROM Program_DJ_Assignment pda

        INNER JOIN Program p
          ON pda.program_ID = p.program_ID

        INNER JOIN DJ dj
          ON pda.dj_ID = dj.dj_ID

      `);

    res.json({
      success: true,
      data: results
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});

module.exports = router;