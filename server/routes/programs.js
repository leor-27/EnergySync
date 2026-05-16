const express = require('express');
const router = express.Router();
const { Program } = require('../models');

// GET ALL PROGRAMS
router.get('/', async (req, res) => {
  try {
    const programs = await Program.findAll({
      order: [['program_ID', 'DESC']]
    });
    res.json({
      success: true,
      data: programs
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// CREATE PROGRAM
router.post('/', async (req, res) => {
  try {
    const newProgram = await Program.create(req.body);
    res.json({
      success: true,
      data: newProgram
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// UPDATE PROGRAM
router.put('/:id', async (req, res) => {
  try {
    await Program.update(req.body, {
      where: {
        program_ID: req.params.id
      }
    });
    res.json({
      success: true
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// DELETE PROGRAM
router.delete('/:id', async (req, res) => {
  try {
    await Program.destroy({
      where: {
        program_ID: req.params.id
      }
    });
    res.json({
      success: true
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;