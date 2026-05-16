const express = require('express');
const router = express.Router();

const { DJ } = require('../models');


// GET DJS
router.get('/', async (req, res) => {
  try {

    const djs = await DJ.findAll({
      order: [['dj_ID', 'DESC']]
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

router.put("/update-profile", async (req, res) => {

  try {

    const {
      admin_ID,
      dj_ID,
      stage_name,
      username,
      first_name,
      last_name
    } = req.body;

    const admin =
      await db.Admin.findByPk(admin_ID);

    const dj =
      await db.DJ.findByPk(dj_ID);

    if (!admin || !dj) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    }

    await admin.update({
      username,
      first_name,
      last_name
    });

    await dj.update({
      stage_name
    });

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