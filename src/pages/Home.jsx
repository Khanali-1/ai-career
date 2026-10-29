import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  FileSearch,
  BriefcaseBusiness,
  Route,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

const features = [
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    text: "Review your resume and discover areas to improve.",
    path: "/resume",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job Finder",
    text: "Explore sample job opportunities matching your goals.",
    path: "/jobs",
  },
  {
    icon: Route,
    title: "Career Roadmap",
    text: "Break your career goal into achievable steps.",
    path: "/roadmap",
  },
  {
    icon: MessageSquare,
    title: "Interview Coach",
    text: "Practice interview questions and prepare your answers.",
    path: "/interview",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-semibold text-violet-700">
                <Sparkles size={16} /> Your AI career companion
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl">
                Your next career move starts{" "}
                <span className="text-violet-600">right here.</span>
              </h1>

              <p className="mt-6 max-w-xl leading-7 text-gray-600">
                Organize your job search, improve your resume, and build a
                practical roadmap for your professional future.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                >
                  Start for free <ArrowRight size={17} />
                </Link>

                <Link
                  to="/jobs"
                  className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Explore jobs
                </Link>
              </div>

              <p className="mt-5 text-xs text-gray-500">
                Demo project · Sample data · AI integration not connected yet
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl border border-white bg-white p-6 shadow-2xl shadow-violet-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Your career snapshot</p>
                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    Keep moving forward
                  </h2>
                </div>
                <span className="rounded-2xl bg-violet-100 p-3 text-violet-600">
                  <Sparkles size={23} />
                </span>
              </div>

              <div className="mt-7 rounded-2xl bg-violet-50 p-5">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-gray-700">
                    Resume strength
                  </span>
                  <span className="font-bold text-violet-700">86/100</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-violet-200">
                  <div className="h-2 w-[86%] rounded-full bg-violet-600" />
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  Illustrative sample score, not an actual resume analysis.
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border p-4">
                  <BriefcaseBusiness className="text-violet-600" />
                  <p className="mt-3 text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-500">Sample job matches</p>
                </div>
                <div className="rounded-2xl border p-4">
                  <Route className="text-emerald-600" />
                  <p className="mt-3 text-2xl font-bold">4 steps</p>
                  <p className="text-sm text-gray-500">Career roadmap</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
              One workspace
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need for your next step
            </h2>
            <p className="mt-4 leading-7 text-gray-500">
              Use the tools below to organize your career journey.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text, path }) => (
              <Link
                to={path}
                key={title}
                className="rounded-2xl border border-gray-100 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-100"
              >
                <span className="inline-flex rounded-xl bg-violet-50 p-3 text-violet-600">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-bold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">{text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-600">
                  Explore <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}