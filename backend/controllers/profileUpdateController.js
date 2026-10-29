
const User = require("../models/user.js");

// Logged-in user ki profile fetch karna
const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const user = await User.findById(userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get profile error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to fetch profile",
    });
  }
};

// Name aur target role update karna
const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { name, targetRole } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          name: name.trim(),
          targetRole: targetRole || "MERN Stack Developer",
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update profile error:", error.message);

    res.status(500).json({
      success: false,
      message: "Unable to update profile",
    });
  }
};

module.exports = {
  getMyProfile,
  updateMyProfile,
};
