
import { useMemo, useState, useEffect } from "react";
import axios from "axios";

import JobCard from "../components/jobs/JobCard.jsx";
import JobFilters from "../components/jobs/JobFilters.jsx";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [location, setLocation] = useState("");

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Backend se jobs GET karna
  const getData = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await axios.get(
        "http://localhost:3000/api/job"
      );

      console.log(response.data);

      // Backend { success, jobs, total } return karta hai
      setData(response.data.jobs || []);
      setMessage("");
    } catch (error) {
      console.error("Failed to fetch jobs:", error.message);

      setData([]);

      setMessage(
        error.response?.data?.message ||
          "Failed to fetch jobs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Backend se aane wali jobs ko filter karna
  const filteredJobs = useMemo(() => {
    return data.filter((job) => {
      const matchesSearch =
        `${job.title || ""} ${job.company || ""}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        type === "All" ||
        (job.type || "").toLowerCase() ===
          type.toLowerCase();

      const matchesLocation =
        (job.location || "")
          .toLowerCase()
          .includes(location.toLowerCase());

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation
      );
    });
  }, [data, search, type, location]);

  return (
    <main className="space-y-6">
      <section>
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          Opportunities
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
          Find your next role
        </h1>

        <p className="mt-2 text-gray-500">
          Search jobs and filter by role, location, or type.
        </p>
      </section>

      <JobFilters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        location={location}
        setLocation={setLocation}
      />

      {loading && (
        <p className="text-sm text-gray-500">
          Loading jobs...
        </p>
      )}

      {!loading && message && (
        <p className="text-sm text-red-600">
          {message}
        </p>
      )}

      {!loading && !message && (
        <>
          <p className="text-sm text-gray-500">
            Showing {filteredJobs.length} opportunities.
          </p>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))}
          </section>

          {filteredJobs.length === 0 && (
            <p className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
              No jobs found. Try changing your filters.
            </p>
          )}
        </>
      )}
    </main>
  );
}
