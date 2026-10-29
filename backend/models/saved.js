const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    user: {
        // id of user and object id is by default
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },

    job: {
        // id of job and object id is by default
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  {
    // automatic date an dtime update
    timestamps: true,
  }
);


savedSchema.index(
  { user: 1, job: 1 },
  { unique: true }
);

module.exports = mongoose.model("Saved", savedSchema);
