import axios from "axios";
import { useState } from "react";
import {
  Route,
  Circle,
  CircleCheck,
  Sparkles,
  Code2,
  LoaderCircle,
} from "lucide-react";

export default function CareerRoadmap() {
  const [level, setLevel] = useState("Beginner");
  const [role, setRole] = useState("MERN Stack Developer");
  const [steps, setSteps] = useState([]);
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Count completed steps
  const completed = steps.filter((step) => step.done).length;

  // Calculate progress percentage
  const progress =
    steps.length > 0
      ? Math.round((completed / steps.length) * 100)
      : 0;

  // Generate roadmap using backend API
  const generateRoadmap = async () => {
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/roadmap/generate",
        {
          role,
          level,
        }
      );

      // Get only the roadmap from the backend response
      const roadMap = response.data.roadmap;

      // Validate the roadmap and its steps
      if (!roadMap || !Array.isArray(roadMap.steps)) {
        throw new Error("Invalid roadmap response from backend");
      }

      // Add done property to every generated step
      const generatedSteps = roadMap.steps.map((step) => ({
        ...step,
        done: false,
      }));

      // Save generated steps in React state
      setSteps(generatedSteps);
      setGenerated(true);

      setMessage(
        response.data.message || "Roadmap generated successfully!"
      );
    } catch (error) {
      console.error("Roadmap error:", error);

      setIsError(true);

      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Mark a step as completed or incomplete
  function toggleStep(index) {
    setSteps((current) =>
      current.map((step, i) =>
        i === index
          ? { ...step, done: !step.done }
          : step
      )
    );
  }

  return (
    <main className="mx-auto max-w-4xl space-y-6 pb-10">
      {/* Page Header */}
      <section className="flex items-start gap-4">
        <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
          <Route size={28} />
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            AI Career Roadmap
          </h1>

          <p className="mt-2 text-gray-500">
            Choose your current level and create your learning path.
          </p>
        </div>
      </section>

      {/* User Selection */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <Sparkles className="text-violet-600" size={22} />

          <h2 className="text-xl font-bold text-gray-900">
            Personalize Your Roadmap
          </h2>
        </div>

        {/* Career Role */}
        <label
          htmlFor="career-role"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Select Career Role
        </label>

        <select
          id="career-role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="mb-6 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        >
          <option>MERN Stack Developer</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Full Stack Developer</option>
          <option>Software Engineer</option>
        </select>

        {/* Experience Level */}
        <p className="mb-3 text-sm font-semibold text-gray-700">
          Select Your Current Level
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              name: "Beginner",
              description: "I am starting my journey.",
            },
            {
              name: "Intermediate",
              description: "I have some experience.",
            },
            {
              name: "Advanced",
              description: "I build complex projects.",
            },
          ].map((item) => (
            <button
              type="button"
              key={item.name}
              onClick={() => setLevel(item.name)}
              className={`rounded-xl border p-4 text-left transition ${
                level === item.name
                  ? "border-violet-500 bg-violet-50 ring-2 ring-violet-100"
                  : "border-gray-200 hover:border-violet-300"
              }`}
            >
              <span className="block font-bold text-gray-900">
                {item.name}
              </span>

              <span className="mt-2 block text-sm leading-5 text-gray-500">
                {item.description}
              </span>
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <button
          type="button"
          onClick={generateRoadmap}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            <Sparkles size={20} />
          )}

          {loading ? "Generating..." : "Generate My Roadmap"}
        </button>

        {/* Success or Error Message */}
        {message && (
          <p
            role="status"
            className={`mt-4 text-center font-semibold ${
              isError ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {message}
          </p>
        )}
      </section>

      {/* Roadmap Results */}
      {generated && (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold text-violet-600">
                <Code2 size={17} />
                YOUR LEARNING PATH
              </p>

              <h2 className="mt-2 text-xl font-bold text-gray-900">
                {role} Roadmap
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Recommended level: {level}
              </p>
            </div>

            <span className="rounded-lg bg-violet-50 px-3 py-2 text-sm font-bold text-violet-700">
              {completed}/{steps.length} completed
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-violet-100">
            <div
              className="h-full rounded-full bg-violet-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-sm text-gray-500">
            {progress}% completed
          </p>

          {/* Roadmap Steps */}
          <div className="mt-6 space-y-3">
            {steps.map((step, index) => (
              <button
                type="button"
                key={`${step.title}-${index}`}
                onClick={() => toggleStep(index)}
                className="flex w-full items-start gap-3 rounded-xl border border-gray-200 p-4 text-left transition hover:border-violet-300 hover:bg-violet-50/40"
              >
                <span
                  className={
                    step.done
                      ? "mt-0.5 text-emerald-600"
                      : "mt-0.5 text-gray-300"
                  }
                >
                  {step.done ? (
                    <CircleCheck size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </span>

                <span className="flex-1">
                  <span
                    className={`block font-semibold ${
                      step.done
                        ? "text-gray-400 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {index + 1}. {step.title}
                  </span>

                  <span className="mt-1 block text-sm leading-6 text-gray-500">
                    {step.description}
                  </span>
                </span>

                <span className="text-xs font-semibold text-violet-600">
                  {step.done ? "Completed" : "Mark done"}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}