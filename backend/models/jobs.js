const mongoose = require("mongoose");

// Define the structure of a job document in MongoDB.
const jobSchema = new mongoose.Schema(
  {
    // Stores the name of the external API providing the job.
    source: {
      type: String,
      default: "himalayas",
      required: true,
    },

    // Stores the unique ID of the job from the external API.
    externalId: {
      type: String,
      required: true,
    },

    // Stores the job title.
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Stores the name of the company offering the job.
    companyName: {
      type: String,
      default: "Unknown company",
    },

    // Stores the URL-friendly name of the company.
    companySlug: String,

    // Stores the URL of the company's logo.
    companyLogo: String,

    // Stores a short summary of the job description.
    excerpt: String,

    // Stores the full job description.
    description: String,

    // Stores the type of employment, such as full-time or internship.
    employmentType: String,

    // Stores job categories or related skills.
    categories: [String],

    // Stores the experience levels required for the job.
    seniority: [String],

    // Stores the locations where candidates are allowed to work.
    locationRestrictions: [
      mongoose.Schema.Types.Mixed,
    ],

    // Stores the allowed time zones for a job.
    timezoneRestrictions: [String],

    // Stores the minimum salary offered for the job.
    minSalary: {
      type: Number,
      default: null,
    },

    // Stores the maximum salary offered for the job.
    maxSalary: {
      type: Number,
      default: null,
    },

    // Stores the currency used for the salary, such as USD or PKR.
    currency: String,

    // Stores the salary payment period, such as hourly or yearly.
    salaryPeriod: String,

    // Stores the URL where candidates can apply for the job.
    applicationLink: String,

    // Stores the date when the job was published.
    pubDate: Date,

    // Stores the date when the job expires.
    expiryDate: Date,

    // Stores the last time the job data was synced with the external API.
    lastSyncedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps.
    timestamps: true,
  }
);

// Prevents duplicate jobs from the same source using their external IDs.
jobSchema.index(
  { source: 1, externalId: 1 },
  { unique: true }
);

// Creates and exports the Job model for database operations.
module.exports = mongoose.model("Job", jobSchema);
