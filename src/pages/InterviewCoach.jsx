import { useState } from "react";
import axios from "axios";
import {
  MessageSquare,
  Sparkles,
  LoaderCircle,
  CircleCheck,
  Lightbulb,
  Target,
  AlertCircle,
} from "lucide-react";
import Button from "../components/common/Button.jsx";

const questions = [
  "Tell me about yourself.",
  "Explain a React project you have built.",
  "What is the difference between let, const, and var?",
  "How does useEffect work in React?",
  "How would you debug an API request that returns an error?",
];

export default function InterviewCoach() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentQuestion = questions[index];

  async function reviewAnswer() {
    if (!answer.trim()) {
      setError("Please write your answer first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setFeedback(null);

      const response = await axios.post(
        "http://localhost:3000/api/interview/review",
        {
          question: currentQuestion,
          answer: answer.trim(),
        }
      );

      setFeedback(response.data.feedback);
    } catch (err) {
      console.error("Interview review error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to review your answer. Please check the backend and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function nextQuestion() {
    if (loading) return;

    setIndex((current) => (current + 1) % questions.length);
    setAnswer("");
    setFeedback(null);
    setError("");
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6">
      {/* Page heading */}
      <section>
        <span className="inline-flex rounded-xl bg-violet-50 p-3 text-violet-600">
          <MessageSquare size={24} />
        </span>

        <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
          Interview Coach
        </h1>

        <p className="mt-2 text-gray-500">
          Practice interview questions and get AI-powered feedback on your answers.
        </p>
      </section>

      {/* Question and answer */}
      <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-violet-600">
            Question {index + 1} of {questions.length}
          </p>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            Practice mode
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-bold leading-relaxed text-gray-900">
          {currentQuestion}
        </h2>

        <label className="mt-6 block">
          <span className="mb-2 block text-sm font-semibold text-gray-700">
            Your answer
          </span>

          <textarea
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
              setFeedback(null);
              setError("");
            }}
            rows={7}
            maxLength={10000}
            disabled={loading}
            placeholder="Write your answer here..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100 disabled:bg-gray-50"
          />

          <span className="mt-1 block text-right text-xs text-gray-400">
            {answer.length}/10000 characters
          </span>
        </label>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            onClick={reviewAnswer}
            disabled={!answer.trim() || loading}
          >
            {loading ? (
              <>
                <LoaderCircle size={16} className="animate-spin" />
                Reviewing...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Review my answer
              </>
            )}
          </Button>

          <Button
            variant="secondary"
            onClick={nextQuestion}
            disabled={loading}
          >
            Next question →
          </Button>
        </div>

        {/* Loading message */}
        {loading && (
          <p className="mt-4 text-sm text-violet-600">
            AI is evaluating your answer. This may take a few seconds...
          </p>
        )}

        {/* AI feedback */}
        {feedback && (
          <div className="mt-6 space-y-5 border-t border-gray-100 pt-6">
            {/* Score */}
            <div className="rounded-xl bg-violet-50 p-5">
              <div className="flex items-center gap-2 text-violet-800">
                <Target size={20} />
                <h3 className="font-bold">Your interview score</h3>
              </div>

              <p className="mt-3 text-4xl font-extrabold text-violet-700">
                {feedback.score}
                <span className="text-xl text-violet-400">/100</span>
              </p>

              <p className="mt-2 text-sm leading-6 text-violet-900">
                {feedback.summary}
              </p>
            </div>

            {/* Strengths */}
            <div className="rounded-xl border border-green-100 p-5">
              <h3 className="flex items-center gap-2 font-bold text-green-800">
                <CircleCheck size={19} />
                What you did well
              </h3>

              {Array.isArray(feedback.strengths) &&
              feedback.strengths.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {feedback.strengths.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm leading-6 text-gray-700"
                    >
                      <span className="text-green-600">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-gray-600">
                  No strengths were returned.
                </p>
              )}
            </div>

            {/* Improvements */}
            <div className="rounded-xl border border-amber-100 p-5">
              <h3 className="flex items-center gap-2 font-bold text-amber-800">
                <Lightbulb size={19} />
                Areas to improve
              </h3>

              {Array.isArray(feedback.improvements) &&
              feedback.improvements.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {feedback.improvements.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm leading-6 text-gray-700"
                    >
                      <span className="text-amber-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-gray-600">
                  No improvements were returned.
                </p>
              )}
            </div>

            {/* Improved sample answer */}
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900">
                Suggested improved answer
              </h3>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-700">
                {feedback.improvedAnswer}
              </p>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                Use this as a learning example. Adapt it to your real experience
                rather than claiming experiences you have not had.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
