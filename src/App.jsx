import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";

import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Jobs from "./pages/Jobs.jsx";
import ResumeAnalyzer from "./pages/ResumeAnalyzer.jsx";
import CareerRoadmap from "./pages/CareerRoadmap.jsx";
import InterviewCoach from "./pages/InterviewCoach.jsx";
import Applications from "./pages/Applications.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 md:flex-row">
        <Sidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={<DashboardLayout><Dashboard /></DashboardLayout>}
        />
        <Route
          path="/jobs"
          element={<DashboardLayout><Jobs /></DashboardLayout>}
        />
        <Route
          path="/resume"
          element={<DashboardLayout><ResumeAnalyzer /></DashboardLayout>}
        />
        <Route
          path="/roadmap"
          element={<DashboardLayout><CareerRoadmap /></DashboardLayout>}
        />
        <Route
          path="/interview"
          element={<DashboardLayout><InterviewCoach /></DashboardLayout>}
        />
        <Route
          path="/applications"
          element={<DashboardLayout><Applications /></DashboardLayout>}
        />
        <Route
          path="/profile"
          element={<DashboardLayout><Profile /></DashboardLayout>}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <div className="p-10 text-center">
              <h1 className="text-3xl font-bold">404 — Page not found</h1>
              <a href="/" className="mt-4 inline-block text-violet-600">
                Back to home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}