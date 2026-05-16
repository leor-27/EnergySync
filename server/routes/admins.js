const express = require('express');
const router = express.Router();

const multer = require("multer");
const path = require("path");

const db = require("../models");
const Admin = db.Admin;

// const { Admin } = require('../models'); // Import Sequelize Model

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
  const admins = await Admin.findAll({ order: [['admin_ID', 'DESC']] });
  res.json({ success: true, data: admins });
    } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

router.post('/', async (req, res) => {
  try {
  const newAdmin = await Admin.create(req.body);
  res.json({ success: true, data: newAdmin });
    } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
});

router.post(
  "/upload-profile",
  upload.single("image"),
  async (req, res) => {
    try {
      // 1. Grab incoming form-data body parameter
      const { admin_ID } = req.body; 

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No image file provided"
        });
      }

      // 2. Strict key verification using your exact primary key casing
      const admin = await Admin.findByPk(admin_ID);

      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "Admin not found"
        });
      }

      // 3. Format pathing clean for web URLs
      const cleanPath = req.file.path.replace(/\\/g, "/");

      // 4. Directly assign property values & manually save to force the raw SQL write
      admin.image_path = cleanPath;
      await admin.save(); 

      // 5. Send back success block
      return res.json({
        success: true,
        image_path: cleanPath
      });

    } catch (err) {
      console.error("Upload error details:", err);
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
);


//       console.log("Before update:", admin.image_path);

//       console.log(req.file);
// await admin.update({
//   image_path: req.file.path
// });

// await admin.reload();

// console.log("After update:", admin.image_path);

//       res.json({
//         success: true,
//         image_path: req.file.path
//       });

//     } catch (err) {

//       console.error(err);

//       res.status(500).json({
//         success: false,
//         message: err.message
//       });
//     }
//   }
// );

module.exports = router;