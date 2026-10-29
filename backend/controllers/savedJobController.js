
const mongoose = require("mongoose");
const Saved = require("../models/saved.js");
const Job = require("../models/jobs.js");

// 1. Save a job
const saveJob = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { jobId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check if already saved
    const alreadySaved = await Saved.findOne({
      user: userId,
      job: jobId,
    });

    if (alreadySaved) {
      return res.status(409).json({
        success: false,
        message: "Job already saved",
      });
    }

    // Save user ID and job ID
    const savedJob = await Saved.create({
      user: userId,
      job: jobId,
    });

    return res.status(201).json({
      success: true,
      message: "Job saved successfully",
      savedJob,
    });
  } catch (error) {
    console.error("Save job error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save job",
    });
  }
};

// 2. Get saved jobs
const getSavedJobs = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const savedJobs = await Saved.find({ user: userId })
      .populate("job")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      savedJobs,
    });
  } catch (error) {
    console.error("Get saved jobs error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch saved jobs",
    });
  }
};

// 3. Remove saved job
const removeSavedJob = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const deletedJob = await Saved.findOneAndDelete({
      user: userId,
      job: jobId,
    });

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "Saved job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job removed from saved jobs",
    });
  } catch (error) {
    console.error("Remove saved job error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to remove saved job",
    });
  }
};


module.exports = {
  saveJob,
  getSavedJobs,
  removeSavedJob,
};
