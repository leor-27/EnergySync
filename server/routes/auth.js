const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const { Op } = require("sequelize");

const db = require("../models");
const Admin = db.Admin;
const DJ = db.DJ;

router.post("/login", async (req, res) => {

  try {

    const { credential, password } = req.body;

    // const admin = await Admin.findOne({
    //   where: {
    //     [Op.or]: [
    //       { email: credential },
    //       { username: credential }
    //     ]
    //   }
    // });

    const admin = await Admin.findOne({
  where: {
    [Op.or]: [
      { email: credential },
      { username: credential }
    ]
  },
  include: [{
    model: DJ
  }]
});

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    if (!admin.is_initialized) {
      return res.status(403).json({
        success: false,
        message: "Please set your credentials first"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      admin.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        admin_ID: admin.admin_ID,
        role: admin.role_type
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      success: true,
      token,
      user: {
        admin_ID: admin.admin_ID,
        username: admin.username,
        first_name: admin.first_name,
        last_name: admin.last_name,
        email: admin.email,
        role: admin.role_type,
        image_path: admin.image_path,
        stage_name: admin.DJ?.stage_name || null,
  dj_ID: admin.DJ?.dj_ID || null
      }
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post("/request-access", async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({
      where: { email }
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Email not found"
      });
    }

    if (admin.is_initialized) {
      return res.status(400).json({
        success: false,
        message: "Account already activated"
      });
    }

    return res.json({
      success: true,
      admin_id: admin.admin_ID
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

router.post("/set-credentials", async (req, res) => {

  try {

    const {
      admin_id,
      first_name,
      last_name,
      username,
      password,
      also_dj,
      stage_name
    } = req.body;

    const admin = await Admin.findByPk(admin_id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    if (admin.is_initialized) {
      return res.status(400).json({
        success: false,
        message: "Account already initialized"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await admin.update({
      first_name,
      last_name,
      username,
      password_hash: hashedPassword,
      is_initialized: true
    });

    if (also_dj && stage_name) {

      await DJ.create({
        admin_ID: admin.admin_ID,
        stage_name
      });

    }

    res.json({
      success: true,
      message: "Credentials set successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post("/forgot-password", async (req, res) => {

  try {

    const { email } = req.body;

    const admin = await Admin.findOne({
      where: { email }
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Email not found"
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    await admin.update({
      reset_token_hash: token,
      reset_token_expires:
        new Date(Date.now() + 3600000)
    });

    res.json({
      success: true,
      token
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

router.post("/reset-password", async (req, res) => {

  try {

    const { token, password } = req.body;

    const admin = await Admin.findOne({
      where: {
        reset_token_hash: token
      }
    });

    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid token"
      });
    }

    if (
      !admin.reset_token_expires ||
      admin.reset_token_expires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Token expired"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await admin.update({
      password_hash: hashedPassword,
      reset_token_hash: null,
      reset_token_expires: null
    });

    res.json({
      success: true,
      message: "Password updated"
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