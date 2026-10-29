
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  ClipboardList,
  CalendarDays,
  Building2,
  ExternalLink,
  X,
  BriefcaseBusiness,
  MapPin,
  LoaderCircle,
} from "lucide-react";

const statusStyles = {
  Applied: "bg-blue-100 text-blue-700",
  Interview: "bg-purple-100 text-purple-700",
  Selected: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    role: "",
    company: "",
    location: "",
    type: "Full-time",
    status: "Applied",
  });

  // MongoDB se saved jobs fetch karna
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view your saved jobs.");
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/saved-jobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const savedJobs = response.data.savedJobs || [];

        const formattedJobs = savedJobs
          .filter((saved) => saved.job)
          .map((saved) => {
            const job = saved.job;

            const location = Array.isArray(job.locationRestrictions)
              ? job.locationRestrictions
                  .map((item) =>
                    typeof item === "string"
                      ? item
                      : item?.name || item?.location || ""
                  )
                  .filter(Boolean)
                  .join(", ")
              : job.location || "";

            return {
              id: saved._id,
              role: job.title || "Untitled Job",
              company:
                job.companyName || job.company || "Unknown Company",
              location: location || "Remote",
              date: saved.createdAt
                ? saved.createdAt.slice(0, 10)
                : "",
              status: "Applied",
              type:
                job.employmentType || job.type || "Not specified",
              applicationLink:
                job.applicationLink || job.url || "",
            };
          });

        setApplications(formattedJobs);
        setError("");
      } catch (err) {
        console.error(
          "Fetch saved jobs error:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
            "Unable to fetch saved jobs. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  // Search aur status filter
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.role
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        application.company
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  // Summary counts
  const totalApplications = applications.length;

  const interviewCount = applications.filter(
    (application) => application.status === "Interview"
  ).length;

  const selectedCount = applications.filter(
    (application) => application.status === "Selected"
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  // Form inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Nayi application frontend par add karna
  const handleSubmit = (event) => {
    event.preventDefault();

    const newApplication = {
      ...formData,
      id: `manual-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      applicationLink: "",
    };

    setApplications((previous) => [
      newApplication,
      ...previous,
    ]);

    setFormData({
      role: "",
      company: "",
      location: "",
      type: "Full-time",
      status: "Applied",
    });

    setShowForm(false);
  };

  // Status update (abhi frontend state mein)
  const updateStatus = (id, newStatus) => {
    setApplications((previous) =>
      previous.map((application) =>
        application.id === id
          ? { ...application, status: newStatus }
          : application
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              My Applications
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage and track your saved jobs and applications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            <Plus size={19} />
            Add Application
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Total Applications
              </p>
              <ClipboardList className="text-violet-600" size={22} />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {totalApplications}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Interviews
              </p>
              <CalendarDays className="text-purple-600" size={22} />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {interviewCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Selected
              </p>
              <BriefcaseBusiness className="text-green-600" size={22} />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {selectedCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Rejected
              </p>
              <X className="text-red-600" size={22} />
            </div>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              {rejectedCount}
            </h2>
          </div>
        </div>

        {/* Search and filter */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by job title or company..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-violet-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-violet-500"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Applications list */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-12 text-slate-500">
              <LoaderCircle className="animate-spin" size={22} />
              Loading your saved jobs...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
              {error}
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <BriefcaseBusiness
                size={42}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                No applications found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Save a job from the Jobs page or add an application manually.
              </p>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <div
                key={application.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:shadow-sm"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                      <Building2
                        size={23}
                        className="text-violet-600"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {application.role}
                      </h3>

                      <p className="mt-1 font-medium text-slate-600">
                        {application.company}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin size={15} />
                          {application.location}
                        </span>

                        <span className="flex items-center gap-1">
                          <BriefcaseBusiness size={15} />
                          {application.type}
                        </span>

                        <span className="flex items-center gap-1">
                          <CalendarDays size={15} />
                          Saved: {application.date || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        statusStyles[application.status] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {application.status}
                    </span>

                    <select
                      value={application.status}
                      onChange={(event) =>
                        updateStatus(
                          application.id,
                          event.target.value
                        )
                      }
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
                      aria-label={`Update status for ${application.role}`}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    {application.applicationLink && (
                      <a
                        href={application.applicationLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                      >
                        View Job
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Application modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add Application
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the job details below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Job Title
                </label>

                <input
                  required
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="e.g. Junior MERN Developer"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Company
                </label>

                <input
                  required
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Location
                </label>

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Employment Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-violet-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-violet-500"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
                >
                  Add Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
