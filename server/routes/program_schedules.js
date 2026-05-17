const express = require('express');
const router = express.Router();

const db = require('../models');

const Program_Schedule =
  db.Program_Schedule;

// GET PROGRAM SCHEDULES
// router.get('/', async (req, res) => {
//   try {

//     const program_schedules =
//       await Program_Schedule.findAll({
//         order: [['createdAt', 'DESC']]
//       });

//     res.json({
//       success: true,
//       data: program_schedules
//     });

//   } catch (err) {

//     res.status(500).json({
//       success: false,
//       message: err.message
//     });

//   }
// });

router.get(
  "/schedule-by-date/:date",
  async (req, res) => {

    try {

      const { date } = req.params;

      const [results] = await db.sequelize.query(`
        SELECT
          ps.schedule_ID,
          ps.program_ID,
          ps.start_time,
          ps.end_time,

          p.program_name,

          dj.dj_ID,
          dj.stage_name AS assigned_dj,

          da.status AS availability_status,
          da.approval_status,
          da.remarks,

          sub.substitution_ID,

          subdj.stage_name AS substitute_dj

        FROM Program_Schedule ps

        INNER JOIN Program p
          ON p.program_ID = ps.program_ID

        INNER JOIN Program_DJ_Assignment pda
          ON pda.program_ID = p.program_ID

        INNER JOIN DJ dj
          ON dj.dj_ID = pda.dj_ID

        LEFT JOIN DJ_Availability da
          ON da.assignment_ID = pda.assignment_ID
          AND da.broadcast_date = ?

        LEFT JOIN Substitutions sub
          ON sub.assignment_ID = pda.assignment_ID
          AND sub.broadcast_date = ?

        LEFT JOIN DJ subdj
          ON subdj.dj_ID = sub.substitute_dj_ID

      `, [date, date]);

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

  }
);

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