import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="rounded-lg bg-violet-600 p-2 text-white">
            <Compass size={18} />
          </span>
          CareerPilot <span className="text-violet-600">AI</span>
        </Link>

        <p className="text-sm text-gray-500">
          Make your next career move with confidence.
        </p>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} CareerPilot AI
        </p>
      </div>
    </footer>
  );
}