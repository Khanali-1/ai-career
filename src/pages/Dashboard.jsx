import {
  BriefcaseBusiness,
  FileSearch,
  ClipboardList,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/dashboard/StatCard,.jsx";
import ActivityFeed from "../components/dashboard/ActivityFeed.jsx";

export default function Dashboard() {
  return (
    <main className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-7 text-white sm:p-10">
        <p className="text-sm font-semibold text-violet-100">
          YOUR CAREER WORKSPACE
        </p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
          Welcome back, career explorer!
        </h1>
        <p className="mt-3 max-w-xl leading-7 text-violet-100">
          Take one practical step today to move closer to your career goal.
        </p>
        <Link
          to="/resume"
          className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 hover:bg-violet-50"
        >
          Analyze my resume
        </Link>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Your progress
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Saved jobs"
            value="12"
            description="Sample dashboard data"
            icon={BriefcaseBusiness}
          />
          <StatCard
            title="Resume score"
            value="86/100"
            description="Illustrative score"
            icon={FileSearch}
          />
          <StatCard
            title="Applications"
            value="8"
            description="Sample tracking data"
            icon={ClipboardList}
          />
          <StatCard
            title="Weekly progress"
            value="+18%"
            description="Illustrative trend"
            icon={TrendingUp}
          />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ActivityFeed />

        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-900">Quick actions</h2>
          <p className="mt-2 text-sm text-gray-500">
            Choose a tool to continue your career preparation.
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Find jobs", "/jobs"],
              ["Improve resume", "/resume"],
              ["Build roadmap", "/roadmap"],
              ["Practice interview", "/interview"],
              ["Track applications", "/applications"],
            ].map(([label, path]) => (
              <Link
                key={path}
                to={path}
                className="flex items-center justify-between rounded-xl border p-4 text-sm font-semibold text-gray-700 transition hover:border-violet-200 hover:bg-violet-50"
              >
                {label}
                <span className="text-violet-600">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}