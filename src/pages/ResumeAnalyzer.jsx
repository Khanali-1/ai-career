import { useState } from "react";
import axios from "axios";
import { Sparkles } from "lucide-react";

import Button from "../components/common/Button.jsx";
import ResumeUploader from "../components/resume/ResumeUploader.jsx";
import ScoreCard from "../components/resume/ScoreCard.jsx";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const analyzeResume = async () => {
    if (!file) {
      setMessage("Please select a PDF resume first.");
      setIsError(true);
      return;
    }

    const formData = new FormData();

    // "resume" must match upload.single("resume") in backend
    formData.append("resume", file);

    try {
      setLoading(true);
      setMessage("");
      setIsError(false);
      setAnalysis(null);

      const response = await axios.post(
        "http://localhost:3000/api/resume/upload",
        formData
      );

      // Get actual AI analysis returned by backend
      if (!response.data?.success || !response.data?.analysis) {
        throw new Error(
          response.data?.message || "AI analysis was not returned."
        );
      }

      setAnalysis(response.data.analysis);
      setMessage(
        response.data.message || "Resume analyzed successfully!"
      );
    } catch (error) {
      console.error("Resume analysis error:", error);

      setAnalysis(null);
      setIsError(true);
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Resume analysis failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl space-y-6">
      {/* Page heading */}
      <section>
        <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
          AI career tools
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
          Resume Analyzer
        </h1>

        <p className="mt-2 text-gray-500">
          Upload your PDF resume to get AI-powered feedback.
        </p>
      </section>

      <div className="grid items-start gap-5 lg:grid-cols-2">
        {/* Upload section */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-2 text-lg font-bold">
            Upload your resume
          </h2>

          <p className="mb-5 text-sm leading-6 text-gray-500">
            Select a PDF up to 5 MB. Gemini will analyze the
            resume and provide feedback.
          </p>

          <ResumeUploader
            onFileSelect={(selectedFile) => {
              setFile(selectedFile);
              setAnalysis(null);
              setMessage("");
              setIsError(false);
            }}
          />

          <Button
            className="mt-5 w-full"
            disabled={!file || loading}
            onClick={analyzeResume}
          >
            <Sparkles size={16} />
            {loading ? "Analyzing resume..." : "Analyze my resume"}
          </Button>

          {message && (
            <p
              role={isError ? "alert" : "status"}
              className={`mt-3 text-sm font-medium ${
                isError ? "text-red-600" : "text-emerald-700"
              }`}
            >
              {message}
            </p>
          )}
        </section>

        {/* AI analysis results */}
        <section>
          {loading ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 text-center">
              <Sparkles
                size={32}
                className="animate-pulse text-violet-600"
              />

              <h2 className="mt-4 font-bold text-gray-900">
                AI is analyzing your resume...
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Please wait while Gemini reviews your PDF.
              </p>
            </div>
          ) : analysis ? (
            <ScoreCard
              score={analysis.score}
              summary={analysis.summary}
              strengths={analysis.strengths}
              improvements={analysis.improvements}
              missingSkills={analysis.missingSkills}
            />
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-200 bg-white p-8 text-center">
              <Sparkles size={30} className="text-violet-600" />

              <h2 className="mt-4 font-bold text-gray-900">
                Your insights will appear here
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                Upload a PDF and click Analyze my resume to
                receive your AI-generated score, strengths,
                improvements, and skill suggestions.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}