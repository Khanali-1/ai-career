
import { useState } from "react";
import axios from "axios";

import {
  MapPin,
  BriefcaseBusiness,
  DollarSign,
  ExternalLink,
  Bookmark,
} from "lucide-react";

export default function JobCard({ job }) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!job) return null;

  const handleSave = async () => {
    if (loading) return;

    const token = localStorage.getItem("token");

    // Check login token
    if (!token) {
      setMessage("Please login first to save jobs.");
      return;
    }

    // Check MongoDB job ID
    if (!job._id) {
      console.error("Job ID missing:", job);
      setMessage("Job ID missing. Please refresh the jobs page.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      if (!saved) {
        // Save job in backend
        const response = await axios.post(
          "http://localhost:3000/api/saved-jobs",
          {
            jobId: job._id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Job saved:", response.data);

        setSaved(true);
        setMessage("Job saved successfully!");
      } else {
        // Remove saved job
        const response = await axios.delete(
          `http://localhost:3000/api/saved-jobs/${job._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Job removed:", response.data);

        setSaved(false);
        setMessage("Job removed from saved jobs.");
      }
    } catch (error) {
      console.error("Save job error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        jobId: job._id,
      });

      if (error.response?.status === 401) {
        setMessage("Your login session is invalid. Please login again.");
      } else {
        setMessage(
          error.response?.data?.message ||
            "Unable to save job. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Job Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-gray-900">
            {job.title || "Untitled Job"}
          </h2>

          <p className="mt-1 text-sm font-medium text-violet-600">
            {job.company || job.companyName || "Unknown Company"}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            aria-label={saved ? "Unsave job" : "Save job"}
            title={saved ? "Unsave job" : "Save job"}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
              saved
                ? "bg-red-50 text-red-500"
                : "bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500"
            } ${loading ? "cursor-wait opacity-60" : ""}`}
          >
            <Bookmark
              className="h-5 w-5"
              fill={saved ? "currentColor" : "none"}
            />
          </button>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100">
            <BriefcaseBusiness className="h-5 w-5 text-violet-600" />
          </div>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-4 space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
          <span>{job.location || "Remote"}</span>
        </div>

        <div className="flex items-center gap-2">
          <BriefcaseBusiness className="h-4 w-4 shrink-0 text-gray-400" />
          <span>
            {job.type || job.employmentType || "Not specified"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 shrink-0 text-gray-400" />
          <span>{job.salary || "Not listed"}</span>
        </div>
      </div>

      {/* Save Status Message */}
      {message && (
        <p
          role="status"
          className="mb-3 text-sm text-gray-600"
        >
          {message}
        </p>
      )}

      {/* Apply Button */}
      <div className="mt-auto border-t border-gray-100 pt-4">
        {job.applicationLink ? (
          <a
            href={job.applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            Apply Now
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="w-full cursor-not-allowed rounded-xl bg-gray-200 px-4 py-3 text-sm font-semibold text-gray-500"
          >
            Application Link Unavailable
          </button>
        )}
      </div>
    </div>
  );
}
