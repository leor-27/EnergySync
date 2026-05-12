const express = require('express');
const router = express.Router();

const { DJ } = require('../models');


// GET DJS
router.get('/', async (req, res) => {
  try {

    const djs = await DJ.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: djs
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});


// CREATE DJ
router.post('/', async (req, res) => {
  try {

    const newDj = await DJ.create(req.body);

    res.json({
      success: true,
      data: newDj
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

module.exports = router;