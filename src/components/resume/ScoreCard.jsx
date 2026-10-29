/*import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Sparkles } from "lucide-react";

export default function ScoreCard({
  score = 86,
  strengths = ["Clear skills section", "Relevant project experience"],
  improvements = ["Add measurable project outcomes", "Tailor keywords to each job"],
}) {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0));

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-100 bg-white p-6"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-violet-50 p-3 text-violet-600">
          <Sparkles size={20} />
        </span>
        <div>
          <h2 className="font-bold text-gray-900">Resume strength</h2>
          <p className="text-xs text-gray-500">Sample score for UI preview</p>
        </div>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-5xl font-extrabold">{safeScore}</span>
        <span className="pb-1 text-sm text-gray-400">/100</span>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-violet-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${safeScore}%` }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full bg-violet-600"
        />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-emerald-700">
            <CheckCircle2 size={18} /> Strengths
          </h3>
          {strengths.map((item) => (
            <p key={item} className="mb-2 text-sm text-gray-600">• {item}</p>
          ))}
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-amber-700">
            <AlertCircle size={18} /> Improve next
          </h3>
          {improvements.map((item) => (
            <p key={item} className="mb-2 text-sm text-gray-600">• {item}</p>
          ))}
        </div>
      </div>
    </motion.section>
  );
}*/



import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lightbulb,
} from "lucide-react";

export default function ScoreCard({
  score,
  summary,
  strengths = [],
  improvements = [],
  missingSkills = [],
}) {
  const safeScore = Math.max(
    0,
    Math.min(100, Number(score) || 0)
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-100 bg-white p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-violet-50 p-3 text-violet-600">
          <Sparkles size={20} />
        </span>

        <div>
          <h2 className="font-bold text-gray-900">
            Resume strength
          </h2>

          <p className="text-xs text-gray-500">
            AI-generated resume assessment
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="mt-6 flex items-end gap-2">
        <span className="text-5xl font-extrabold text-gray-900">
          {safeScore}
        </span>

        <span className="pb-1 text-sm text-gray-400">
          /100
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-violet-100"
        role="progressbar"
        aria-label="Resume score"
        aria-valuenow={safeScore}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${safeScore}%` }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full bg-violet-600"
        />
      </div>

      {/* Overall summary */}
      {summary && (
        <div className="mt-5 rounded-xl bg-violet-50 p-4">
          <h3 className="font-semibold text-violet-900">
            Overall feedback
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-700">
            {summary}
          </p>
        </div>
      )}

      {/* Strengths and improvements */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-emerald-700">
            <CheckCircle2 size={18} />
            Strengths
          </h3>

          {strengths.length > 0 ? (
            strengths.map((item, index) => (
              <p
                key={`${item}-${index}`}
                className="mb-2 text-sm leading-6 text-gray-600"
              >
                • {item}
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No strengths returned.
            </p>
          )}
        </div>

        <div>
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-amber-700">
            <AlertCircle size={18} />
            Improve next
          </h3>

          {improvements.length > 0 ? (
            improvements.map((item, index) => (
              <p
                key={`${item}-${index}`}
                className="mb-2 text-sm leading-6 text-gray-600"
              >
                • {item}
              </p>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No improvements returned.
            </p>
          )}
        </div>
      </div>

      {/* Skills to consider */}
      {missingSkills.length > 0 && (
        <div className="mt-6 border-t border-gray-100 pt-5">
          <h3 className="mb-3 flex items-center gap-2 font-semibold text-violet-700">
            <Lightbulb size={18} />
            Skills to consider
          </h3>

          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="rounded-full bg-violet-50 px-3 py-1.5 text-sm text-violet-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
}
