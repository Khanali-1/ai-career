export default function JobFilters({
  search,
  setSearch,
  type,
  setType,
  location,
  setLocation,
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-gray-100 bg-white p-4 md:grid-cols-3">
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search job title or company"
        className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
      />

      <input
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        placeholder="City or remote"
        className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
      />

      <select
        value={type}
        onChange={(event) => setType(event.target.value)}
        className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500"
      >
        <option value="All">All job types</option>
        <option value="Full-time">Full-time</option>
        <option value="Internship">Internship</option>
        <option value="Remote">Remote</option>
        <option value="Contract">Contract</option>
      </select>
    </div>
  );
}