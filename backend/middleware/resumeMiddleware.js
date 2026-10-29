// mutler is a node js lib to handle uploaded pdf
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum 5 MB
  },
 // mimetype is provided property of mutler 
// and cb is callback
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed."));
    }

    // cb null = no error true = accept the file 

    cb(null, true);
  },
});

module.exports = upload;