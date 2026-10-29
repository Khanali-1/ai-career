
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Compass } from "lucide-react";
import axios from "axios";

import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setIsSuccess(false);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      // Backend se JWT token lena
      const token = response.data.token;

      // Token nahi mila to login complete nahi samjhenge
      if (!token) {
        throw new Error("Login response mein token nahi mila.");
      }

      // JWT token browser mein save karna
      localStorage.setItem("token", token);

      setIsSuccess(true);
      setMessage(response.data.message || "Login successful");

      // Dashboard par navigate karna
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      setIsSuccess(false);
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Failed to login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-gradient-to-br from-violet-950 to-violet-700 p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-3 text-xl font-bold">
          <Compass size={28} /> CareerPilot AI
        </Link>

        <div className="max-w-lg">
          <h1 className="text-5xl font-extrabold leading-tight">
            Your next opportunity starts with one step.
          </h1>
          <p className="mt-5 leading-7 text-violet-100">
            Keep your job search, skills, and career goals organized in one place.
          </p>
        </div>

        <p className="text-sm text-violet-200">
          Welcome back to CareerPilot AI.
        </p>
      </section>

      <section className="flex items-center justify-center px-5 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 font-bold lg:hidden"
          >
            <Compass className="text-violet-600" /> CareerPilot AI
          </Link>

          <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
            Welcome back
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900">
            Log in to your account
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Continue building your next career move.
          </p>

          <div className="mt-7 space-y-5">
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>

            {message && (
              <p
                role="status"
                className={`rounded-xl p-3 text-sm text-center ${
                  isSuccess
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {message}
              </p>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            New to CareerPilot?{" "}
            <Link to="/register" className="font-bold text-violet-600">
              Create an account
            </Link>
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 w-full text-sm text-gray-400 hover:text-violet-600"
          >
            Back to home
          </button>
        </form>
      </section>
    </main>
  );
}
