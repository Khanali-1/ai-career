
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const authMiddleware = require("../middleware/authMiddleware.js");
const User = require("../models/user.js");

const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/profileUpdateController.js");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `profile-${req.user.id || req.user._id}-${Date.now()}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG and WEBP images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

// GET /api/profile
router.get("/", authMiddleware, getMyProfile);

// PUT /api/profile
router.put("/", authMiddleware, updateMyProfile);

// POST /api/profile/photo
router.post(
  "/photo",
  authMiddleware,
  upload.single("photo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please select a profile photo",
        });
      }

      const userId = req.user.id || req.user._id;

      const user = await User.findByIdAndUpdate(
        userId,
        {
          profilePhoto: `/uploads/${req.file.filename}`,
        },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Profile photo updated successfully",
        user,
      });
    } catch (error) {
      console.error("Upload photo error:", error.message);

      res.status(500).json({
        success: false,
        message: "Unable to upload profile photo",
      });
    }
  }
);

module.exports = router;
