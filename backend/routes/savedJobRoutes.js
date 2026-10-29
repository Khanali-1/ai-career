const express = require("express");
const router = express.Router();

const {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/savedJobController.js");


const authMiddleware = require("../middleware/authMiddleware.js");

// Save a job
router.post("/", authMiddleware, saveJob);

// Get all saved jobs of logged-in user
router.get("/", authMiddleware, getSavedJobs);

// Remove a saved job
router.delete("/:jobId", authMiddleware, removeSavedJob);

module.exports = router;