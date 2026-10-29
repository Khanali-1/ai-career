/*const express = require("express");

const upload = require("../middleware/resumeMiddleware.js");
const  uploadResume  = require("../controllers/resumeController.js");

/*const router = express.Router();

router.post( "/upload",(req, res, next) => {
    // upload will accept only 1 file single na dnma ewill be resume 
    upload.single("resume")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message:
            err.code === "LIMIT_FILE_SIZE"
              ? "PDF must be 5 MB or smaller."
              : err.message,
        });
      }

      next();
    });
  },
  uploadResume
);

module.exports = router; */



const express = require("express");

const upload = require("../middleware/resumeMiddleware.js");
const uploadResume = require("../controllers/resumeController.js");

const router = express.Router();

router.post(
  "/upload",
  (req, res, next) => {
    upload.single("resume")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message:
            err.code === "LIMIT_FILE_SIZE"
              ? "PDF must be 5 MB or smaller."
              : err.message,
        });
      }

      next();
    });
  },
  uploadResume
);

module.exports = router;