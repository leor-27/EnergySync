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

module.exports = router;