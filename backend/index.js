
require("dotenv").config();

const app = require("./app.js");
const connectDB = require("./config/db.js");

let connectionPromise;

module.exports = async (req, res) => {
  try {
    if (!connectionPromise) {
      connectionPromise = connectDB().catch((error) => {
        connectionPromise = null;
        throw error;
      });
    }

    await connectionPromise;
    return app(req, res);
  } catch (error) {
    console.error("Backend error:", error);

    return res.status(500).json({
      success: false,
      message: "Backend initialization failed"
    });
  }
};
