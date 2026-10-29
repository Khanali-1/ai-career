
const express = require("express");

const userModel = require("../models/user.js");
const login = require("../controllers/loginController.js");
const register = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// Register
router.post("/register", register);

// All users (currently public)
router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

// Login
router.post("/login", login);

// Protected profile route
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Profile accessed successfully",
    user: req.user,
  });
});

module.exports = router;
