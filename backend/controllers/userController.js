const userModel=require('../models/user.js');
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create a new user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword
    });

    // 4. Send success response
    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Registration error:", error);

     return res.status(500).json({
    message: error.message || "Registration failed",
  });

    
  }
};

module.exports=register
