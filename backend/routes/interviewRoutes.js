const express = require("express");
const router = express.Router();

const reviewAnswer = require("../controllers/interviewController");

router.post("/review", reviewAnswer);

module.exports = router;