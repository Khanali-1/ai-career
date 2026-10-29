
const userModel = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    // 1. Frontend se email aur password lena
    const { email, password } = req.body;

    // 2. Database mein user find karna
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 3. Entered password ko stored hash se compare karna
    const isPassCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPassCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 4. JWT token generate karna
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      }
    );

    // 5. Frontend ko token aur user information bhejna
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Login failed. Try again later.",
    });
  }
};

module.exports = login;
