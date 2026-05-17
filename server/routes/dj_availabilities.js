const express = require('express');
const router = express.Router();
const db = require('../models');

const DJ_Availability = db.DJ_Availability;

router.get('/', async (req, res) => {
  try {

    const dj_availabilities =
      await DJ_Availability.findAll({
        order: [['availability_ID', 'DESC']]
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

router.post(
  "/dj-availability",
  async (req, res) => {

    try {

      const {
        assignment_ID,
        broadcast_date,
        status,
        remarks
      } = req.body;

      await DJ_Availability.create({
        assignment_ID,
        broadcast_date,
        status,
        remarks,
        approval_status: "Pending",
        declared_at: new Date()
      });

      res.json({
        success: true
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
  "/pending-unavailability",
  async (req, res) => {

    try {

      const [results] =
        await db.sequelize.query(`
          SELECT
            av.availability_ID,
            dj.stage_name,
            p.program_name,
            av.broadcast_date,
            av.remarks
          FROM DJ_Availability av
          INNER JOIN Program_DJ_Assignment pda
          ON av.assignment_ID = pda.assignment_ID
          INNER JOIN DJ dj
          ON pda.dj_ID = dj.dj_ID
          INNER JOIN Program p
          ON p.program_ID = pda.program_ID
          WHERE av.approval_status = 'Pending'
        `);

      res.json({
        success: true,
        data: results
      });

    } catch (err) {

      console.error(err);

    }

  }
);

router.put("/approve", async (req, res) => {

  const {
    availability_ID,
    superadmin_ID
  } = req.body;

  try {

    await db.sequelize.query(
      "CALL sp_ApproveUnavailability(?, ?)",
      {
        replacements: [
          availability_ID,
          superadmin_ID
        ]
      }
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

  }

});

router.put("/reject", async (req, res) => {

  const {
    availability_ID,
    superadmin_ID
  } = req.body;

  try {

    await db.sequelize.query(
      "CALL sp_RejectUnavailability(?, ?)",
      {
        replacements: [
          availability_ID,
          superadmin_ID
        ]
      }
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

  }

});

router.post("/confirm-availability", async (req, res) => {

  try {

    const {
      assignment_ID,
      broadcast_date
    } = req.body;

    await db.sequelize.query(
      "CALL sp_confirmAvailability(?, ?)",
      {
        replacements: [
          assignment_ID,
          broadcast_date
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

router.get(
  "/unavailable-today",
  async (req, res) => {

    try {

      const [results] =
        await db.sequelize.query(`

          SELECT
            av.availability_ID,
            p.program_name,
            dj.stage_name AS assigned_dj,
            av.broadcast_date,
            av.status AS availability_status,
            av.declared_at

          FROM DJ_Availability av

          INNER JOIN Program_DJ_Assignment pda
            ON pda.assignment_ID = av.assignment_ID

          INNER JOIN Program p
            ON p.program_ID = pda.program_ID

          INNER JOIN DJ dj
            ON pda.dj_ID = dj.dj_ID

          WHERE av.broadcast_date = CURDATE()
          AND av.status = 'Unavailable'

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

module.exports = router;