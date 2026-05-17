const express = require('express');
const router = express.Router();
const db = require('../models');

const Substitutions = db.Substitutions;

router.get('/', async (req, res) => {
  try {
  const substitutions = await Substitutions.findAll({ order: [['substitution_ID', 'DESC']] });
  res.json({ success: true, data: substitutions });
    } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
  const newSubstitution = await Substitutions.create(req.body);
  res.json({ success: true, data: newSubstitution });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post("/assign-substitute", async (req, res) => {

  const {
    assignment_ID,
    substitute_dj_ID,
    broadcast_date,
    assigned_by_admin_ID
  } = req.body;

  try {

    await db.sequelize.query(
      "CALL sp_AssignSubDJ(?, ?, ?, ?)",
      {
        replacements: [
          assignment_ID,
          substitute_dj_ID,
          broadcast_date,
          assigned_by_admin_ID
        ]
      }
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

});

router.delete("/:id", async (req, res) => {

  try {

    await db.sequelize.query(
      "CALL sp_cancelSubstitution(?)",
      {
        replacements: [
          req.params.id
        ]
      }
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false
    });

  }

});

router.get(
  "/history/:date",
  async (req, res) => {

    try {

      const { date } = req.params;

      const [results] =
        await db.sequelize.query(`
          SELECT
            p.program_name,
            og_dj.stage_name AS assigned_dj,
            sub_dj.stage_name AS substitute_dj,
            s.status,
            s.broadcast_date,
            ps.start_time,
            ps.end_time

          FROM Substitutions s

          INNER JOIN Program_DJ_Assignment pda
            ON s.assignment_ID = pda.assignment_ID

          INNER JOIN Program p
            ON pda.program_ID = p.program_ID

          INNER JOIN DJ og_dj
            ON pda.dj_ID = og_dj.dj_ID

          INNER JOIN DJ sub_dj
            ON s.substitute_dj_ID = sub_dj.dj_ID

          INNER JOIN Program_Schedule ps
            ON ps.program_ID = p.program_ID

          WHERE s.broadcast_date = ?
        `,
        {
          replacements: [date]
        });

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

router.get(
  "/available-djs/:assignment_ID",
  async (req, res) => {

    try {

      const { assignment_ID } = req.params;

      const [rows] =
        await db.sequelize.query(`

          SELECT DISTINCT
            dj.dj_ID,
            dj.stage_name

          FROM DJ dj

          INNER JOIN Program_DJ_Assignment target_pda
            ON target_pda.assignment_ID = ?

          INNER JOIN Program_Schedule target_ps
            ON target_ps.program_ID =
               target_pda.program_ID

          LEFT JOIN (

            SELECT
              pda.dj_ID,
              ps.start_time,
              ps.end_time

            FROM Program_DJ_Assignment pda

            INNER JOIN Program_Schedule ps
              ON ps.program_ID = pda.program_ID

          ) sched

            ON dj.dj_ID = sched.dj_ID

            AND target_ps.start_time < sched.end_time

            AND target_ps.end_time > sched.start_time

          WHERE sched.dj_ID IS NULL

          AND dj.dj_ID != target_pda.dj_ID

        `, {
          replacements: [assignment_ID]
        });

      res.json({
        success: true,
        data: rows
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        success: false,
        message: err.message
      });

    }

  }
);

router.get(
  "/history",
  async (req, res) => {

    try {

      const [rows] =
        await db.sequelize.query(`

          SELECT
            s.substitution_ID,
            p.program_name,

            og_dj.stage_name
              AS original_dj,

            sub_dj.stage_name
              AS substitute_dj,

            s.status,
            s.broadcast_date,

            ps.start_time,
            ps.end_time

          FROM Substitutions s

          INNER JOIN Program_DJ_Assignment pda
            ON s.assignment_ID =
               pda.assignment_ID

          INNER JOIN Program p
            ON pda.program_ID =
               p.program_ID

          INNER JOIN DJ og_dj
            ON pda.dj_ID =
               og_dj.dj_ID

          INNER JOIN DJ sub_dj
            ON s.substitute_dj_ID =
               sub_dj.dj_ID

          INNER JOIN Program_Schedule ps
            ON ps.program_ID =
               p.program_ID

          ORDER BY
            s.broadcast_date DESC,
            ps.start_time ASC

        `);

      res.json({
        success: true,
        data: rows
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        success: false,
        message: err.message
      });

    }

  }
);

module.exports = router;