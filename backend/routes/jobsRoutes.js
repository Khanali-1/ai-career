const express =require('express');

const syncJobs = require('../services/jobSync.js')

const router = express.Router();
const getJobs = require('../controllers/jobController.js')

router.get("/",getJobs);

router.post("/sync", async (req, res) => {
  try {
    const result = await syncJobs();

    res.status(200).json(result);
  } catch (error) {
    console.error("Job sync error:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports=router;